import React from "react";

import getQueryClient from "@/lib/get-query-client";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { obtenirUnDocumentAction } from "../actions/librairie.actions";
import { documentKeyQuery } from "./index.query";

const queryClient = getQueryClient();

//1- Option de requête
export const documentQueryOption = (id: string) => {
  return {
    queryKey: documentKeyQuery("detail", id),
    queryFn: async () => {
      if (!id) throw new Error("L'identifiant document est requis");

      const result = await obtenirUnDocumentAction(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    enabled: !!id,
  };
};

//2- Hook pour récupérer un document
export const useDocumentQuery = (id: string) => {
  const query = useQuery(documentQueryOption(id));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération du document:",
        description:
          query.error instanceof Error
            ? query.error.message
            : "Erreur inconnue",
        icon: <X />,
        color: "danger",
      });
    }
  }, [query.isError, query.error]);

  return query;
};

//3- Fonction pour précharger un document
export const prefetchDocumentQuery = (id: string) => {
  return queryClient.prefetchQuery(documentQueryOption(id));
};
