"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import React from 'react';
import {useForm} from "react-hook-form";
import {DocumentCreateDTO, DocumentCreateSchema} from "@/features/librairie/schema/document.schema";
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
import {useAjouterDocumentMutation} from "@/features/librairie/queries/document-add.mutation";

function AjouterDocumentPage() {
	const router = useRouter();
	const form = useForm<DocumentCreateDTO>({
		resolver: zodResolver(DocumentCreateSchema),
		defaultValues: {
			title: 'document test 0',
			description: 'description lonnguee pour tester le document',
		},
	})

	const {
		mutateAsync: ajouterDocument,
		isPending: isAddingDocument
	} = useAjouterDocumentMutation()

	const isLoading = isAddingDocument || form.formState.isSubmitting;

	const onSubmit = async (data: DocumentCreateDTO) => {
		await ajouterDocument({
			data
		}, {
			onSuccess: () => {
				router.push('/dashboard/librairie');
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
						<Title>Ajouter un document</Title>
						<Subtitle>Ajoutez un nouveau document dans votre librairie</Subtitle>
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
												placeholder="Entrez le titre du document..."
												{...field}
												className="text-lg h-12"
											/>
										</FormControl>
										<FormDescription>
											Le titre principal du document (3-255 caractères)
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Couverture - Grande image sur sa propre ligne */}
							<FormField
								control={form.control}
								name="covers"
								render={({field}) => (
									<FormItem>
										<FormLabel className="text-lg font-semibold">Image de couverture</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept="image/*"
												onChange={(e) => {
													const file = e.target.files?.[0];
													field.onChange(file);
												}}
												id="cover-input"
											/>
										</FormControl>
										<FormDescription>
											Image de couverture du document (JPG, PNG, WebP)
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Description */}
							<FormField
								control={form.control}
								name="description"
								render={({field}) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Écrivez une description du document..."
												{...field}
												className="min-h-24 resize-none"
											/>
										</FormControl>
										<FormDescription>
											Une description du document (10-500 caractères)
										</FormDescription>
										<FormMessage/>
									</FormItem>
								)}
							/>

							{/* Fichier du document */}
							<FormField
								control={form.control}
								name="fichiers"
								render={({field}) => (
									<FormItem>
										<FormLabel>Fichier</FormLabel>
										<FormControl>
											<Input
												type="file"
												accept=".pdf,.epub"
												onChange={(e) => {
													const file = e.target.files?.[0];
													field.onChange(file);
												}}
												id="fichier-input"
											/>
										</FormControl>
										<FormDescription>
											Le fichier du document à uploader (PDF ou EPUB)
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
									{isLoading ? 'Création en cours...' : 'Ajouter le document'}
								</Button>
							</div>
						</form>
					</Form>
				</CardBody>
			</Card>
		</Content>
	);
}

export default AjouterDocumentPage;