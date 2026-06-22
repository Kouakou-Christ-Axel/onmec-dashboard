"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, X } from "lucide-react";
import { supprimerCommentaireAction } from "../actions/moderation.actions";
import { useInvalidateCommentaireQuery } from "./index.query";

export const useSupprimerCommentaireMutation = () => {
  const invalidateCommentaireQuery = useInvalidateCommentaireQuery();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (!id) {
        throw new Error("L'identifiant du commentaire est requis.");
      }
      const result = await supprimerCommentaireAction(id);
      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la suppression du commentaire"
        );
      }
      return result.data!;
    },
    onSuccess: async () => {
      addToast({
        title: "Commentaire supprimé avec succès",
        description: "Le commentaire a été supprimé définitivement.",
        promise: invalidateCommentaireQuery(),
        icon: <CheckCircle2 />,
        color: "success",
      });
    },
    onError: async (error) => {
      addToast({
        title: "Erreur suppression commentaire:",
        description: error.message,
        promise: Promise.reject(error),
        icon: <X />,
        color: "danger",
      });
    },
  });
};
