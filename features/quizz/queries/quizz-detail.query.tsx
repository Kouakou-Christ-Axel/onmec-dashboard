import { useQuery } from "@tanstack/react-query";
import React from "react";
import { addToast } from "@heroui/toast";
import { X } from "lucide-react";
import { obtenirQuizzParIdAction } from "../actions/quizz.actions";
import { quizzKeyQuery } from "./index.query";

//1- Option de requête
export const quizzDetailQueryOption = (id: string) => {
	return {
		queryKey: quizzKeyQuery("detail", id),
		queryFn: async () => {
			const result = await obtenirQuizzParIdAction(id);
			if (!result.success) {
				throw new Error(result.error || "Erreur lors de la récupération du quizz");
			}
			return result.data!;
		},
		enabled: Boolean(id),
		staleTime: 30 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
	};
};

//2- Hook
export const useQuizzDetailQuery = (id: string) => {
	const query = useQuery(quizzDetailQueryOption(id));

	React.useEffect(() => {
		if (query.isError && query.error) {
			addToast({
				title: "Erreur lors de la récupération du quizz:",
				description:
					query.error instanceof Error ? query.error.message : "Erreur inconnue",
				icon: <X />,
				color: "danger",
			});
		}
	}, [query]);

	return query;
};
