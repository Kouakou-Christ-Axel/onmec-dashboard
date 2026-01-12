import React from "react";

import { useQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { obtenirToutesActualitesAction } from "../actions/actualites.actions";
import { IActualiteSearchParams } from "../types/actualite.type";
import { actualiteKeyQuery } from "./index.query";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const actualitesListQueryOption = (
  actualitesParamsDTO: IActualiteSearchParams
) => {
  return {
    queryKey: actualiteKeyQuery("list", actualitesParamsDTO),
    queryFn: async () => {
      const result = await obtenirToutesActualitesAction(actualitesParamsDTO);
      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la récupération des actualités"
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

//2- Hook pour récupérer les actualités
export const useActualitesListQuery = (
  actualitesParamsDTO: IActualiteSearchParams
) => {
  const query = useQuery(actualitesListQueryOption(actualitesParamsDTO));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération des actualités:",
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

//3- Fonction pour précharger les actualités appelée dans les pages
export const prefetchActualitesListQuery = (
  actualitesParamsDTO: IActualiteSearchParams
) => {
  return queryClient.prefetchQuery(
    actualitesListQueryOption(actualitesParamsDTO)
  );
};
