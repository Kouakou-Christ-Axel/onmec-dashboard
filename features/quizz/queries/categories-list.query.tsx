import React from "react";

import { useQuery } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import { obtenirCategoriesQuizzAction } from "../actions/quizz.actions";
import { categorieQuizzKeyQuery } from "./index.query";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const categoriesQuizzListQueryOption = () => {
	return {
		queryKey: categorieQuizzKeyQuery("list"),
		queryFn: async () => {
			const result = await obtenirCategoriesQuizzAction();
			if (!result.success) {
				throw new Error(
					result.error || "Erreur lors de la récupération des catégories"
				);
			}
			return result.data!;
		},
		placeholderData: (previousData: any) => previousData,
		staleTime: 30 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
	};
};

//2- Hook pour récupérer les catégories de quizz
export const useCategoriesQuizzQuery = () => {
	const query = useQuery(categoriesQuizzListQueryOption());

	React.useEffect(() => {
		if (query.isError && query.error) {
			addToast({
				title: "Erreur lors de la récupération des catégories:",
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

//3- Préchargement
export const prefetchCategoriesQuizzListQuery = () => {
	return queryClient.prefetchQuery(categoriesQuizzListQueryOption());
};
