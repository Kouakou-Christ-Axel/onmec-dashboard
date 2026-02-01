"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, X } from "lucide-react";
import { modifierSignalementAction } from "@/features/signalements";
import { useInvalidateSignalementQuery } from "../index.query";

export const useModifierSignalementMutation = () => {
  const invalidateSignalementQuery = useInvalidateSignalementQuery();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: FormData;
    }) => {
      // Appel de l'API avec l'action
      const result = await modifierSignalementAction(id, data as any);

      if (!result.success) {
        throw new Error(
          result.message || "Erreur lors de la modification du signalement"
        );
      }

      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Signalement modifié avec succès",
        description: "Le signalement a été mis à jour",
        promise: invalidateSignalementQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur modification signalement:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
