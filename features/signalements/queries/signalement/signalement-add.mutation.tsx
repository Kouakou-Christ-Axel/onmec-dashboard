"use client";

import {addToast} from "@heroui/toast";
import {
	useMutation,
} from '@tanstack/react-query';
import {CheckCircle2, X} from "lucide-react";
import {
	ajouterSignalementAction
} from '@/features/signalements';
import { useInvalidateSignalementQuery } from '../index.query';

export const useAjouterSignalementMutation = () => {
	const invalidateSignalementQuery = useInvalidateSignalementQuery()

	return useMutation({
		mutationFn: async ({data}: { data: FormData }) => {
			// Appel de l'API avec l'action
			const result = await ajouterSignalementAction(data as any);

			if (!result.success) {
				throw new Error(result.message || "Erreur lors de l'ajout du signalement");
			}

			return result.data!;
		},
		onSuccess: async () => {
			addToast({
				title: "Signalement ajouté avec succès",
				description: "Votre signalement a été créé avec succès",
				promise: invalidateSignalementQuery(),
				icon: <CheckCircle2/>,
				color: "success",
			});
		},

		onError: async (error) => {
			console.log("error query", error)
			addToast({
				title: "Erreur lors de l'ajout du signalement:",
				description: error.message,
				promise: Promise.reject(error),
				icon: <X/>,
				color: "danger",
			});
		},
	});
};



