"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, X } from "lucide-react";
import { processAndValidateFormData } from "ak-zod-form-kit";
import { modifierCategorieQuizzAction } from "../actions/quizz.actions";
import { CategorieQuizCreateDTO, CategorieQuizSchema } from "../schema/categorie-quiz.schema";
import { useInvalidateCategorieQuizzQuery } from './index.query';

export const useModifierCategorieQuizzMutation = () => {
	const invalidateCategorieQuizzQuery = useInvalidateCategorieQuizzQuery();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: CategorieQuizCreateDTO }) => {
			if (!id) {
				throw new Error("L'identifiant de la catégorie est requis.");
			}

			const validation = processAndValidateFormData(CategorieQuizSchema, data, {
				outputFormat: "object",
			});

			if (!validation.success) {
				throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
			}

			const result = await modifierCategorieQuizzAction(id, validation.data as CategorieQuizCreateDTO);

			if (!result.success) {
				throw new Error(result.error || "Erreur lors de la modification de la catégorie");
			}

			return result.data!;
		},
		onSuccess: async () => {
			addToast({
				title: "Catégorie modifiée avec succès",
				description: "La catégorie a été mise à jour",
				promise: invalidateCategorieQuizzQuery(),
				icon: <CheckCircle2 />,
				color: "success",
			});
		},
		onError: async (error) => {
			addToast({
				title: "Erreur lors de la modification de la catégorie:",
				description: error.message,
				promise: Promise.reject(error),
				icon: <X />,
				color: "danger",
			});
		},
	});
};
