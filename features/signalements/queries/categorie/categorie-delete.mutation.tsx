"use client";

import { addToast } from "@heroui/toast";
import {
    useMutation,
} from '@tanstack/react-query';
import { CheckCircle2, X } from "lucide-react";
import {
    supprimerCategorieAction
} from '@/features/signalements';
import { useInvalidateCategorieQuery } from '../index.query';

export const useSupprimerCategorieMutation = () => {
    const invalidateCategorieQuery = useInvalidateCategorieQuery()
    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!id) {
                throw new Error("L'identifiant de la catégorie est requis.");
            }
            const result = await supprimerCategorieAction(id)
            if (!result.success) {
                throw new Error(result.message || "Erreur lors de la suppression de la catégorie");
            }
            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Catégorie supprimée avec succès",
                description: "La catégorie a été supprimée",
                promise: invalidateCategorieQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },
        onError: async (error) => {
            addToast({
                title: "Erreur suppression catégorie:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
};
