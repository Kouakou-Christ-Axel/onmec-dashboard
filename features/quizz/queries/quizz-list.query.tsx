import getQueryClient from "@/lib/get-query-client";
import { IQuizz } from "../types/quizz.type";
import { quizzKeyQuery } from "./index.query";
import { obtenirTousQuizzAction } from "../actions/quizz.actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const quizzListQueryOption = (quizzParamsDTO: IQuizz) => {
  return {
    queryKey: quizzKeyQuery("list", quizzParamsDTO),
    queryFn: async () => {
      const result = await obtenirTousQuizzAction(quizzParamsDTO);
      if (!result.success) {
        throw new Error(
          result.error || "Erreur lors de la récupération des quizz"
        );
      }
      return result.data!;
    },
    placeholderData: (previousData: any) => previousData,
    staleTime: 30 * 1000, //30 secondes
    refetchOnWindowFocus: false, //Ne pas refetch lors du focus de la fenetre
    refetchOnMount: true, //Refetch lors du mount
  }
}

//2- Hook pour récupérer les quizz
export const useActualitesListQuery = (
  quizzParamsDTO: IQuizz
) => {
  const query = useQuery(quizzListQueryOption(quizzParamsDTO));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération des quizz:",
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

//3- Fonction pour précharger les quizz appelée dans les pages
export const prefetchActualitesListQuery = (
  quizzParamsDTO: IQuizz
) => {
  return queryClient.prefetchQuery(
    quizzListQueryOption(quizzParamsDTO)
  );
};