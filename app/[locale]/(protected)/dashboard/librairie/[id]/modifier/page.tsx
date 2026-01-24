"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {
	ActualiteUpdateDTO,
	ActualiteUpdateSchema,
} from "@/features/actualites/schema/actualite.schema";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import {Card, CardBody, Spinner} from "@heroui/react";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "@/i18n/navigation";
import TiptapEditor from "@/components/form/tiptap-editor";
import {useModifierActualiteMutation} from "@/features/actualites/queries/actualite-update.mutation";
import {useParams} from "next/navigation";
import {useActualiteQuery} from "@/features/actualites/queries/actualite-detail.query";
import Image from "next/image";

function ModifierActualitePage() {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "";
	const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);


	const {data: actualiteData, isLoading: isLoadingActualite, isError} = useActualiteQuery(id);

	const form = useForm<ActualiteUpdateDTO>({
		resolver: zodResolver(ActualiteUpdateSchema),
		defaultValues: {
			title: actualiteData?.title ?? "",
			content: actualiteData?.content ?? "",
			date: actualiteData ? new Date(actualiteData.date) : new Date(),
			excerpt: actualiteData?.excerpt ?? "",
		},
		values: actualiteData
			? {
				title: actualiteData.title,
				content: actualiteData.content,
				date: new Date(actualiteData.date),
				excerpt: actualiteData.excerpt,
			}
			: undefined,
	});

	const {mutateAsync: modifierActualite, isPending: isUpdatingActualite} =
		useModifierActualiteMutation();

	const isLoading = isUpdatingActualite || form.formState.isSubmitting || isLoadingActualite;

	const onSubmit = async (data: ActualiteUpdateDTO) => {
		await modifierActualite(
			{
				id,
				data,
			},
			{
				onSuccess: () => {
					router.push("/dashboard/actualites");
				},
			}
		);
	};

	if (!id) {
		return (
			<Content>
				<div className="py-10 text-center">Identifiant d'actualité manquant.</div>
			</Content>
		);
	}

	if (isLoadingActualite) {
		return (
			<Content>
				<div className="flex items-center justify-center py-10">
					<Spinner label="Chargement de l'actualité..."/>
				</div>
			</Content>
		);
	}

	if (isError || !actualiteData) {
		return (
			<Content>
				<div className="py-10 text-center text-danger-500">
					Impossible de charger l'actualité.
				</div>
			</Content>
		);
	}

	return (
		<Content>
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center gap-4 mb-4">
					<Button variant="ghost" size="icon" onClick={() => router.back()}>
						<ArrowLeft className="w-4 h-4"/>
					</Button>
					<div>
						<Title>Modifier une actualité</Title>
						<Subtitle>Mettre à jour les informations de l'actualité</Subtitle>
					</div>
				</div>
			</div>

			{/* Formulaire */}
			<Card className="shadow-sm border-0">
				<CardBody className="p-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{/* Titre - Grand input en haut */}
							<FormField
								control={form.control}
								name="title"
								render={({field}) => (
									<FormItem>
										<FormLabel className="text-lg font-semibold">Titre</FormLabel>
										<FormControl>
											<Input
												placeholder="Entrez le titre de l'actualité..."
												{...field}
												className="text-lg h-12"
											/>
										</FormControl>
										<FormDescription>
											Le titre principal de votre actualité (3-255 caractères)
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Date et Image - Sur la même ligne */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Date */}
								<FormField
									control={form.control}
									name="date"
									render={({field}) => (
										<FormItem>
											<FormLabel>Date de publication</FormLabel>
											<FormControl>
												<Input
													type="datetime-local"
													{...field}
													value={field.value instanceof Date
														? field.value.toISOString().slice(0, 16)
														: ""
													}
													onChange={(e) => {
														const date = e.target.value ? new Date(e.target.value) : new Date();
														field.onChange(date);
													}}
													className="h-10"
												/>
											</FormControl>
											<FormDescription>
												Sélectionnez la date et l'heure de publication
											</FormDescription>
											<FormMessage/>
										</FormItem>
									)}
								/>
							</div>

							{/* Image (ligne dédiée et grande prévisualisation) */}
							<FormField
								control={form.control}
								name="image"
								render={({field}) => (
									<FormItem>
										<FormLabel>Image</FormLabel>
										<FormControl>
											<div className="flex flex-col gap-3">
												{/* Aperçu large de l'image existante ou sélectionnée */}
												<div className="relative w-full h-80 rounded-md overflow-hidden border">
													<Image
														alt={actualiteData.title}
														src={previewUrl || actualiteData.imageUrl || "/assets/images/fallback.png"}
														fill
														className="object-cover"
													/>
												</div>
												<Input
													type="file"
													accept="image/*"
													onChange={(e) => {
														const file = e.target.files?.[0] || null;
														field.onChange(file || undefined);
														if (file) {
															const url = URL.createObjectURL(file);
															setPreviewUrl(url);
														} else {
															setPreviewUrl(null);
														}
													}}
												/>
											</div>
										</FormControl>
										<FormDescription>
											Image actuelle affichée ci-dessus. Sélectionnez un fichier pour la remplacer (JPG, PNG, WebP).
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Extrait */}
							<FormField
								control={form.control}
								name="excerpt"
								render={({field}) => (
									<FormItem>
										<FormLabel>Extrait</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Écrivez un court résumé de l'actualité..."
												{...field}
												className="min-h-24 resize-none"
											/>
										</FormControl>
										<FormDescription>
											Un résumé court qui apparaîtra dans les listes (10-500 caractères)
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Contenu (Tiptap) */}
							<FormField
								control={form.control}
								name="content"
								render={({field}) => (
									<FormItem>
										<FormLabel>Contenu</FormLabel>
										<FormControl>
											<TiptapEditor
												value={field.value}
												onChange={field.onChange}
												disabled={isLoading}
											/>
										</FormControl>
										<FormDescription>
											Contenu complet de l'actualité avec formatage riche (min. 20 caractères)
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Boutons d'action */}
							<div className="flex gap-4 pt-6 border-t">
								<Button type="button" variant="outline" onClick={() => router.back()}>
									Annuler
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? "Modification en cours..." : "Enregistrer les modifications"}
								</Button>
							</div>
						</form>
					</Form>
				</CardBody>
			</Card>
		</Content>
	);
}

export default ModifierActualitePage;

