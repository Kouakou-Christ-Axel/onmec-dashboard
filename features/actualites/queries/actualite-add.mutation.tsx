"use client";

import { addToast } from "@heroui/toast";
import {
    useMutation,
} from '@tanstack/react-query';
import { processAndValidateFormData } from "ak-zod-form-kit";
import { CheckCircle2, X } from "lucide-react";
import {
    ajouterActualiteAction
} from '../actions/actualites.actions';
import { ActualiteCreateDTO, ActualiteCreateSchema } from '../schema/actualite.schema';
import { useInvalidateActualiteQuery } from './index.query';

export const useAjouterActualiteMutation = () => {
    const invalidateActualiteQuery = useInvalidateActualiteQuery()

    return useMutation({
        mutationFn: async ({ data }: { data: ActualiteCreateDTO }) => {
            // Validation des données
            const validation = processAndValidateFormData(ActualiteCreateSchema, data,
                {
                    outputFormat: "formData",
                })

            if (!validation.success) {
                throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
            }

            // Appel de l'API avec l'action
            const result = await ajouterActualiteAction(validation.data as ActualiteCreateDTO);

            if (!result.success) {
                throw new Error(result.error || "Erreur lors de l'ajout de l'actualité");
            }

            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Actualité ajoutée avec succès",
                description: "Actualité ajoutée avec succès",
                promise: invalidateActualiteQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },

        onError: async (error) => {
            console.log("error query", error)
            addToast({
                title: "Erreur lors de l'ajout de l'actualité:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
};
