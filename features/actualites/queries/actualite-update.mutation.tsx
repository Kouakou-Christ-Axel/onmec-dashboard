"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { processAndValidateFormData } from "ak-zod-form-kit";
import { CheckCircle2, X } from "lucide-react";
import { modifierActualiteAction } from "../actions/actualites.actions";
import {
  ActualiteUpdateDTO,
  ActualiteUpdateSchema,
} from "../schema/actualite.schema";
import { useInvalidateActualiteQuery } from "./index.query";

export const useModifierActualiteMutation = () => {
  const invalidateActualiteQuery = useInvalidateActualiteQuery();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ActualiteUpdateDTO;
    }) => {
      // Validation des données
      const validation = processAndValidateFormData(
        ActualiteUpdateSchema,
        data,
        {
          outputFormat: "formData",
        }
      );
      if (!validation.success) {
        throw new Error(
          validation.errorsInString ||
            "Une erreur est survenue lors de la validation des données."
        );
      }

      const result = await modifierActualiteAction(
        id,
        validation.data as ActualiteUpdateDTO
      );

      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la modification de l'actualité"
        );
      }

      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Actualité modifiée avec succès",
        description: "Actualité modifiée avec succès",
        promise: invalidateActualiteQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur modification actualité:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
