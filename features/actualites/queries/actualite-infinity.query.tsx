import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { IActualite } from "../types/actualite.type";
import { PaginatedResponse } from "@/types/api.type";
import { obtenirToutesActualitesAction } from "../actions/actualites.actions";
import { IActualiteSearchParams } from "../types/actualite.type";
import { actualiteKeyQuery } from "./index.query";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête
export const actualitesInfinityQueryOption = (
  actualitesParamsDTO: IActualiteSearchParams
) => {
  return {
    queryKey: actualiteKeyQuery("list", actualitesParamsDTO),
    queryFn: async ({ pageParam = 1 }) => {
      const result = await obtenirToutesActualitesAction({
        ...actualitesParamsDTO,
        page: pageParam,
      });

      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la récupération des actualités"
        );
      }

      return result.data!;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage: PaginatedResponse<IActualite>) => {
      const hasNextPage = lastPage.meta.totalPages > lastPage.meta.page;
      return hasNextPage ? lastPage.meta.page + 1 : undefined;
    },
  };
};

//2- Hook pour récupérer les actualités
export const useActualitesInfinityQuery = (
  actualitesParamsDTO: IActualiteSearchParams
) => {
  const query = useInfiniteQuery(
    actualitesInfinityQueryOption(actualitesParamsDTO)
  );

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

//3- Fonction pour précharger les actualités
export const prefetchActualitesInfinityQuery = (
  actualitesParamsDTO: IActualiteSearchParams
) => {
  return queryClient.prefetchInfiniteQuery(
    actualitesInfinityQueryOption(actualitesParamsDTO)
  );
};
