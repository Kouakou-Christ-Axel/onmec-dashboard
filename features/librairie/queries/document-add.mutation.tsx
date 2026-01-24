"use client";

import {addToast} from "@heroui/toast";
import {
	useMutation,
} from '@tanstack/react-query';
import {processAndValidateFormData} from "ak-zod-form-kit";
import {CheckCircle2, X} from "lucide-react";
import {
	ajouterDocumentAction
} from '../actions/librairie.actions';
import {DocumentCreateDTO, DocumentCreateSchema} from '../schema/document.schema';
import {useInvalidateDocumentQuery} from './index.query';

export const useAjouterDocumentMutation = () => {
	const invalidateDocumentQuery = useInvalidateDocumentQuery()

	return useMutation({
		mutationFn: async ({data}: { data: DocumentCreateDTO }) => {
			// Validation des données
			const validation = processAndValidateFormData(DocumentCreateSchema, data,
				{
					outputFormat: "formData",
				})

			if (!validation.success) {
				throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
			}

			// Appel de l'API avec l'action
			const result = await ajouterDocumentAction(validation.data as DocumentCreateDTO);

			if (!result.success) {
				throw new Error(result.error || "Erreur lors de l'ajout du document");
			}

			return result.data!;
		},
		onSuccess: async () => {
			addToast({
				title: "Document ajouté avec succès",
				description: "Document ajouté avec succès",
				promise: invalidateDocumentQuery(),
				icon: <CheckCircle2/>,
				color: "success",
			});
		},

		onError: async (error) => {
			console.log("error query", error)
			addToast({
				title: "Erreur lors de l'ajout du document:",
				description: error.message,
				promise: Promise.reject(error),
				icon: <X/>,
				color: "danger",
			});
		},
	});
};
