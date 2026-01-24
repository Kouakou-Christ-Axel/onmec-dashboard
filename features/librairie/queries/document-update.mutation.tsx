"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { processAndValidateFormData } from "ak-zod-form-kit";
import { CheckCircle2, X } from "lucide-react";
import { modifierDocumentAction } from "../actions/librairie.actions";
import {
  DocumentUpdateDTO,
  DocumentUpdateSchema,
} from "../schema/document.schema";
import { useInvalidateDocumentQuery } from "./index.query";

export const useModifierDocumentMutation = () => {
  const invalidateDocumentQuery = useInvalidateDocumentQuery();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: DocumentUpdateDTO;
    }) => {
      // Validation des données
      const validation = processAndValidateFormData(
        DocumentUpdateSchema,
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

      const result = await modifierDocumentAction(
        id,
        validation.data as DocumentUpdateDTO
      );

      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la modification du document"
        );
      }

      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Document modifié avec succès",
        description: "Document modifié avec succès",
        promise: invalidateDocumentQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur modification document:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
