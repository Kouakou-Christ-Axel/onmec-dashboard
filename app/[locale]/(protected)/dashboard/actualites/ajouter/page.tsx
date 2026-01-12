"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import React from 'react';
import {useForm} from "react-hook-form";
import {ActualiteCreateDTO, ActualiteCreateSchema} from "@/features/actualites/schema/actualite.schema";
import {Button} from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import {Card, CardBody} from "@heroui/react";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "@/i18n/navigation";
import TiptapEditor from "@/components/form/tiptap-editor";
import {useAjouterActualiteMutation} from "@/features/actualites/queries/actualite-add.mutation";

function AjouterActualitePage() {
	const router = useRouter();
	const form = useForm<ActualiteCreateDTO>({
		resolver: zodResolver(ActualiteCreateSchema),
		defaultValues: {
			title: '',
			content: '',
			date: new Date(),
			excerpt: '',
		},
	})

	const {
		mutateAsync: ajouterActualite,
		isPending: isAddingActualite
	} = useAjouterActualiteMutation()

	const isLoading = isAddingActualite || form.formState.isSubmitting;

	const onSubmit = async (data: ActualiteCreateDTO) => {
		await ajouterActualite({
			data
		}, {
			onSuccess: () => {
				router.push('/dashboard/actualites');
			}
		});
	}

	return (
		<Content>
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center gap-4 mb-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => router.back()}
					>
						<ArrowLeft className="w-4 h-4"/>
					</Button>
					<div>
						<Title>Ajouter une actualité</Title>
						<Subtitle>Créez une nouvelle actualité pour votre plateforme</Subtitle>
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
														: ''
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

								{/* Image */}
								<FormField
									control={form.control}
									name="image"
									render={({field}) => (
										<FormItem>
											<FormLabel>Image</FormLabel>
											<FormControl>
												<Input
													type="file"
													accept="image/*"
													onChange={(e) => {
														const file = e.target.files?.[0];
														field.onChange(file);
													}}
												/>
											</FormControl>
											<FormDescription>
												Image d'illustration de l'actualité (JPG, PNG, WebP)
											</FormDescription>
											<FormMessage/>
										</FormItem>
									)}
								/>
							</div>

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
								<Button
									type="button"
									variant="outline"
									onClick={() => router.back()}
								>
									Annuler
								</Button>
								<Button
									type="submit"
									disabled={isLoading}
								>
									{isLoading ? 'Création en cours...' : 'Créer l\'actualité'}
								</Button>
							</div>
						</form>
					</Form>
				</CardBody>
			</Card>
		</Content>
	);
}

export default AjouterActualitePage;