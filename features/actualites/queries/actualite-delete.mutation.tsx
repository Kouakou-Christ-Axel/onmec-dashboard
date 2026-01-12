"use client";

import { addToast } from "@heroui/toast";
import {
    useMutation,
} from '@tanstack/react-query';
import { CheckCircle2, X } from "lucide-react";
import {
    supprimerActualiteAction
} from '../actions/actualites.actions';
import { useInvalidateActualiteQuery } from './index.query';

export const useSupprimerActualiteMutation = () => {
    const invalidateActualiteQuery = useInvalidateActualiteQuery()
    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!id) {
                throw new Error("L'identifiant de l'actualité est requis.");
            }
            const result = await supprimerActualiteAction(id)
            if (!result.success) {
                throw new Error(result.error || "Erreur lors de la suppression de l'actualité");
            }
            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Actualité supprimée avec succès",
                description: "Actualité supprimée avec succès",
                promise: invalidateActualiteQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },
        onError: async (error) => {
            addToast({
                title: "Erreur suppression actualité:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
};