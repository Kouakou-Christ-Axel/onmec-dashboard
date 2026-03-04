import React from "react";

import {useQuery} from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import {obtenirTousLesCategoriesAction} from "@/features/signalements";
import {categorieKeyQuery} from "../index.query";
import {addToast} from "@heroui/toast";
import {X} from "lucide-react";

const queryClient = getQueryClient();

//1- Option de requête optimisée
export const categoriesListQueryOption = () => {
	return {
		queryKey: categorieKeyQuery("list"),
		queryFn: async () => {
			const result = await obtenirTousLesCategoriesAction();
			if (!result.success) {
				throw new Error(
					result.message || "Erreur lors de la récupération des catégories"
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

//2- Hook pour récupérer les catégories
export const useCategoriesListQuery = () => {
	const query = useQuery(categoriesListQueryOption());

	// Gestion des erreurs dans le hook
	React.useEffect(() => {
		if (query.isError && query.error) {
			addToast({
				title: "Erreur lors de la récupération des catégories:",
				description:
					query.error instanceof Error
						? query.error.message
						: "Erreur inconnue",
				icon: <X/>,
				color: "danger",
			});
		}
	}, [query]);

	return query;
};

//3- Fonction pour précharger les catégories appelée dans les pages
export const prefetchCategoriesListQuery = () => {
	return queryClient.prefetchQuery(categoriesListQueryOption());
};
