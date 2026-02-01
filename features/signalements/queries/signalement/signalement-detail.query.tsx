import React from "react";

import getQueryClient from "@/lib/get-query-client";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { obtenirUnSignalementAction } from "@/features/signalements";
import { signalementKeyQuery } from "../index.query";

const queryClient = getQueryClient();

//1- Option de requête
export const signalementQueryOption = (id: string) => {
  return {
    queryKey: signalementKeyQuery("detail", id),
    queryFn: async () => {
      if (!id) throw new Error("L'identifiant du signalement est requis");

      const result = await obtenirUnSignalementAction(id);

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
    enabled: !!id,
  };
};

//2- Hook pour récupérer un signalement
export const useSignalementQuery = (id: string) => {
  const query = useQuery(signalementQueryOption(id));

  // Gestion des erreurs dans le hook
  React.useEffect(() => {
    if (query.isError && query.error) {
      addToast({
        title: "Erreur lors de la récupération du signalement:",
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

//3- Fonction pour précharger un signalement
export const prefetchSignalementQuery = (id: string) => {
  return queryClient.prefetchQuery(signalementQueryOption(id));
};


