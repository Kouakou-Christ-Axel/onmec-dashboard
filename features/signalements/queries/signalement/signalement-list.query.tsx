import React from "react";

import {useQuery} from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import {obtenirTousLesSignalementsAction} from "@/features/signalements";
import {ISignalementSearchParams} from "@/features/signalements";
import {signalementKeyQuery} from "../index.query";
import {addToast} from "@heroui/toast";
import {X} from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const signalementsListQueryOption = (
  signalementsParamsDTO: ISignalementSearchParams
) => {
  return {
    queryKey: signalementKeyQuery("list", signalementsParamsDTO),
    queryFn: async () => {
      const result = await obtenirTousLesSignalementsAction(signalementsParamsDTO);
      if (!result.success) {
        throw new Error(
          result.message || "Erreur lors de la récupération des signalements"
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

//2- Hook pour récupérer les signalements
export const useSignalementsListQuery = (
  signalementsParamsDTO: ISignalementSearchParams
) => {
  const query = useQuery(signalementsListQueryOption(signalementsParamsDTO));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération des signalements:",
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

//3- Fonction pour précharger les signalements appelée dans les pages
export const prefetchSignalementsListQuery = (
  signalementsParamsDTO: ISignalementSearchParams
) => {
  return queryClient.prefetchQuery(
    signalementsListQueryOption(signalementsParamsDTO)
  );
};


