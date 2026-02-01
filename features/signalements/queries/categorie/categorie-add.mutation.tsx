"use client";

import {addToast} from "@heroui/toast";
import { useMutation } from '@tanstack/react-query';
import {CheckCircle2, X} from "lucide-react";
import { ajouterCategorieAction } from '@/features/signalements';
import { useInvalidateCategorieQuery } from '../index.query';
import type { ICreateCategorieSignalement } from '@/features/signalements';

export const useAjouterCategorieMutation = () => {
	const invalidateCategorieQuery = useInvalidateCategorieQuery()

	return useMutation({
		mutationFn: async ({data}: { data: ICreateCategorieSignalement }) => {
			// Appel de l'API avec l'action
			const result = await ajouterCategorieAction(data);

			if (!result.success) {
				throw new Error(result.message || "Erreur lors de l'ajout de la catégorie");
			}

			return result.data!;
		},
		onSuccess: async () => {
			addToast({
				title: "Catégorie ajoutée avec succès",
				description: "La catégorie a été créée avec succès",
				promise: invalidateCategorieQuery(),
				icon: <CheckCircle2/>,
				color: "success",
			});
		},

		onError: async (error) => {
			console.log("error query", error)
			addToast({
				title: "Erreur lors de l'ajout de la catégorie:",
				description: error.message,
				promise: Promise.reject(error),
				icon: <X/>,
				color: "danger",
			});
		},
	});
};
