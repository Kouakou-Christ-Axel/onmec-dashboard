import React from "react";

import { useQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { obtenirTousLesDocumentsAction } from "../actions/librairie.actions";
import { IDocumentSearchParams } from "../types/document.types";
import { documentKeyQuery } from "./index.query";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const documentsListQueryOption = (
  documentsParamsDTO: IDocumentSearchParams
) => {
  return {
    queryKey: documentKeyQuery("list", documentsParamsDTO),
    queryFn: async () => {
      const result = await obtenirTousLesDocumentsAction(documentsParamsDTO);
      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la récupération des documents"
        );
      }
      return result.data!;
    },
    placeholderData: (previousData: any) => previousData,
    staleTime: 30 * 1000, //30 secondes
    refetchOnWindowFocus: false, //Ne pas refetch lors du focus de la fenetre
    refetchOnMount: true, //Refetch lors du mount
  };
};

//2- Hook pour récupérer les documents
export const useDocumentsListQuery = (
  documentsParamsDTO: IDocumentSearchParams
) => {
  const query = useQuery(documentsListQueryOption(documentsParamsDTO));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération des documents:",
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

//3- Fonction pour précharger les documents appelée dans les pages
export const prefetchDocumentsListQuery = (
  documentsParamsDTO: IDocumentSearchParams
) => {
  return queryClient.prefetchQuery(
    documentsListQueryOption(documentsParamsDTO)
  );
};
