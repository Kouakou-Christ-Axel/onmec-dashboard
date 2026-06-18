"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, X } from "lucide-react";
import { processAndValidateFormData } from "ak-zod-form-kit";
import { ajouterCategorieQuizzAction } from "../actions/quizz.actions";
import { CategorieQuizCreateDTO, CategorieQuizSchema } from "../schema/categorie-quiz.schema";
import { useInvalidateCategorieQuizzQuery } from './index.query';

export const useAjouterCategorieQuizzMutation = () => {
	const invalidateCategorieQuizzQuery = useInvalidateCategorieQuizzQuery();

	return useMutation({
		mutationFn: async ({ data }: { data: CategorieQuizCreateDTO }) => {
			const validation = processAndValidateFormData(CategorieQuizSchema, data, {
				outputFormat: "object",
			});

			if (!validation.success) {
				throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
			}

			const result = await ajouterCategorieQuizzAction(validation.data as CategorieQuizCreateDTO);

			if (!result.success) {
				throw new Error(result.error || "Erreur lors de l'ajout de la catégorie");
			}

			return result.data!;
		},
		onSuccess: async () => {
			addToast({
				title: "Catégorie ajoutée avec succès",
				description: "La catégorie a été créée avec succès",
				promise: invalidateCategorieQuizzQuery(),
				icon: <CheckCircle2 />,
				color: "success",
			});
		},
		onError: async (error) => {
			addToast({
				title: "Erreur lors de l'ajout de la catégorie:",
				description: error.message,
				promise: Promise.reject(error),
				icon: <X />,
				color: "danger",
			});
		},
	});
};
