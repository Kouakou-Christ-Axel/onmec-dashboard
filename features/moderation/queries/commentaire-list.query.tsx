import React from "react";

import { useQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { obtenirTousLesCommentairesAction } from "../actions/moderation.actions";
import { ICommentaireSearchParams } from "../types/commentaire.types";
import { commentaireKeyQuery } from "./index.query";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const commentairesListQueryOption = (
  commentairesParamsDTO: ICommentaireSearchParams
) => {
  return {
    queryKey: commentaireKeyQuery("list", commentairesParamsDTO),
    queryFn: async () => {
      const result = await obtenirTousLesCommentairesAction(
        commentairesParamsDTO
      );
      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la récupération des commentaires"
        );
      }
      return result.data!;
    },
    placeholderData: (previousData: any) => previousData,
    staleTime: 30 * 1000, //30 secondes
    refetchOnWindowFocus: false, //Ne pas refetch lors du focus de la fenêtre
    refetchOnMount: true, //Refetch lors du mount
  };
};

//2- Hook pour récupérer les commentaires
export const useCommentairesListQuery = (
  commentairesParamsDTO: ICommentaireSearchParams
) => {
  const query = useQuery(commentairesListQueryOption(commentairesParamsDTO));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération des commentaires:",
        description:
          query.error instanceof Error
            ? query.error.message
            : "Erreur inconnue",
        icon: <X />,
        color: "danger",
      });
    }
  }, [query]);

  return query;
};

//3- Fonction pour précharger les commentaires appelée dans les pages
export const prefetchCommentairesListQuery = (
  commentairesParamsDTO: ICommentaireSearchParams
) => {
  return queryClient.prefetchQuery(
    commentairesListQueryOption(commentairesParamsDTO)
  );
};
