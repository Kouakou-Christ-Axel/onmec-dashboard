import React from "react";

import getQueryClient from "@/lib/get-query-client";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { obtenirUneActualiteAction } from "../actions/actualites.actions";
import { actualiteKeyQuery } from "./index.query";

const queryClient = getQueryClient();

//1- Option de requête
export const actualiteQueryOption = (id: string) => {
  return {
    queryKey: actualiteKeyQuery("detail", id),
    queryFn: async () => {
      if (!id) throw new Error("L'identifiant actualité est requis");

      const result = await obtenirUneActualiteAction(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    enabled: !!id,
  };
};

//2- Hook pour récupérer une actualité
export const useActualiteQuery = (id: string) => {
  const query = useQuery(actualiteQueryOption(id));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération de l'actualité:",
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

//3- Fonction pour précharger une actualité
export const prefetchActualiteQuery = (id: string) => {
  return queryClient.prefetchQuery(actualiteQueryOption(id));
};
