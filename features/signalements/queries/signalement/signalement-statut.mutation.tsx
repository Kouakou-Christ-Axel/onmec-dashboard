"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, X } from "lucide-react";
import { modifierSignalementAction } from "@/features/signalements";
import type { ISignalement } from "@/features/signalements";
import { useInvalidateSignalementQuery } from "../index.query";

type StatutSignalement = ISignalement["statut"];

/**
 * Change le statut d'un signalement (NOUVEAU / EN_COURS / RESOLU / REJETE).
 */
export const useChangerStatutSignalementMutation = () => {
  const invalidateSignalementQuery = useInvalidateSignalementQuery();
  return useMutation({
    mutationFn: async ({
      id,
      statut,
    }: {
      id: string;
      statut: StatutSignalement;
    }) => {
      const formData = new FormData();
      formData.append("statut", statut);

      const result = await modifierSignalementAction(id, formData as any);
      if (!result.success) {
        throw new Error(result.message || "Erreur lors du changement de statut");
      }
      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Statut mis à jour",
        description: "Le statut du signalement a été modifié.",
        promise: invalidateSignalementQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur changement de statut:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};

/**
 * Valide ou invalide un signalement.
 */
export const useValiderSignalementMutation = () => {
  const invalidateSignalementQuery = useInvalidateSignalementQuery();
  return useMutation({
    mutationFn: async ({
      id,
      validation,
    }: {
      id: string;
      validation: boolean;
    }) => {
      const formData = new FormData();
      formData.append("validation", String(validation));

      const result = await modifierSignalementAction(id, formData as any);
      if (!result.success) {
        throw new Error(
          result.message || "Erreur lors de la validation du signalement"
        );
      }
      return result.data!;
    },
    onSuccess: async (_data, variables) => {
      addToast({
        title: variables.validation
          ? "Signalement validé"
          : "Signalement invalidé",
        description: variables.validation
          ? "Le signalement a été marqué comme validé."
          : "Le signalement a été marqué comme non validé.",
        promise: invalidateSignalementQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur de validation:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
