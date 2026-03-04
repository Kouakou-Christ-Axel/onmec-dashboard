"use client";

import { addToast } from "@heroui/toast";
import {
    useMutation,
} from '@tanstack/react-query';
import { CheckCircle2, X } from "lucide-react";
import {
    supprimerDocumentAction
} from '../actions/librairie.actions';
import { useInvalidateDocumentQuery } from './index.query';

export const useSupprimerDocumentMutation = () => {
    const invalidateDocumentQuery = useInvalidateDocumentQuery()
    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!id) {
                throw new Error("L'identifiant du document est requis.");
            }
            const result = await supprimerDocumentAction(id)
            if (!result.success) {
                throw new Error(result.error || "Erreur lors de la suppression du document");
            }
            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Document supprimé avec succès",
                description: "Document supprimé avec succès",
                promise: invalidateDocumentQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },
        onError: async (error) => {
            addToast({
                title: "Erreur suppression document:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
};