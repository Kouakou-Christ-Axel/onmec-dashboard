"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, X } from "lucide-react";
import { modifierCategorieAction } from "@/features/signalements";
import { useInvalidateCategorieQuery } from "../index.query";
import type { IUpdateCategorieSignalement } from "@/features/signalements";

export const useModifierCategorieMutation = () => {
  const invalidateCategorieQuery = useInvalidateCategorieQuery();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateCategorieSignalement;
    }) => {
      // Appel de l'API avec l'action
      const result = await modifierCategorieAction(id, data);

      if (!result.success) {
        throw new Error(
          result.message || "Erreur lors de la modification de la catégorie"
        );
      }

      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Catégorie modifiée avec succès",
        description: "La catégorie a été mise à jour",
        promise: invalidateCategorieQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur modification catégorie:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
