"use client";

import { addToast } from "@heroui/toast";
import {
    useMutation,
} from '@tanstack/react-query';
import { CheckCircle2, X } from "lucide-react";
import {
    supprimerSignalementAction
} from '@/features/signalements';
import { useInvalidateSignalementQuery } from '../index.query';

export const useSupprimerSignalementMutation = () => {
    const invalidateSignalementQuery = useInvalidateSignalementQuery()
    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!id) {
                throw new Error("L'identifiant du signalement est requis.");
            }
            const result = await supprimerSignalementAction(id)
            if (!result.success) {
                throw new Error(result.message || "Erreur lors de la suppression du signalement");
            }
            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Signalement supprimé avec succès",
                description: "Le signalement a été supprimé",
                promise: invalidateSignalementQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },
        onError: async (error) => {
            addToast({
                title: "Erreur suppression signalement:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
};

