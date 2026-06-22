"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, X } from "lucide-react";
import { masquerCommentaireAction } from "../actions/moderation.actions";
import { useInvalidateCommentaireQuery } from "./index.query";

export const useMasquerCommentaireMutation = () => {
  const invalidateCommentaireQuery = useInvalidateCommentaireQuery();
  return useMutation({
    mutationFn: async ({
      id,
      masque,
    }: {
      id: string;
      masque: boolean;
    }) => {
      if (!id) {
        throw new Error("L'identifiant du commentaire est requis.");
      }
      const result = await masquerCommentaireAction(id, masque);
      if (!result.success) {
        throw new Error(
          result.error ||
            "Erreur lors de la modification de la visibilité du commentaire"
        );
      }
      return result.data!;
    },
    onSuccess: async (_data, variables) => {
      addToast({
        title: variables.masque
          ? "Commentaire masqué avec succès"
          : "Commentaire affiché avec succès",
        description: variables.masque
          ? "Le commentaire n'est plus visible par les citoyens."
          : "Le commentaire est de nouveau visible par les citoyens.",
        promise: invalidateCommentaireQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur modification visibilité:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
