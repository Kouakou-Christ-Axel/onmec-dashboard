'use client';

import { useQueryStates } from 'nuqs';
import { signalementCitoyenFiltersClient } from '../filters/signalement-citoyen.filters';
import { ISignalementSearchParams } from '@/features/signalements';

/**
 * Hook custom pour gérer les filtres et paramètres d'URL des signalements citoyens
 * Utilise useQueryStates pour synchroniser tous les filtres avec l'URL
 */
export const useSignalementCitoyenFilters = () => {
	const [filters, setFilters] = useQueryStates(
		signalementCitoyenFiltersClient.filter,
		signalementCitoyenFiltersClient.option
	);

	// Construire les paramètres de recherche
	const searchParams: ISignalementSearchParams = {
		titre: filters.titre || undefined,
		categorieId: filters.categorieId || undefined,
		statut: filters.statut as any || undefined,
		page: filters.page,
		limit: filters.limit,
	};

	/**
	 * Réinitialise tous les filtres
	 */
	const resetFilters = async () => {
		await setFilters({
			titre: null,
			categorieId: null,
			statut: null,
			page: null,
			limit: null,
		});
	};

	/**
	 * Met à jour un filtre spécifique
	 */
	const updateFilter = async <K extends keyof typeof signalementCitoyenFiltersClient.filter>(
		key: K,
		value: any
	) => {
		await setFilters({ [key]: value });
	};

	return {
		// État des filtres
		...filters,

		// Fonction de mise à jour globale
		setFilters,

		// Fonction de mise à jour d'un seul filtre
		updateFilter,

		// Données construites
		searchParams,

		// Utilitaires
		resetFilters,
		isFiltered: !!(filters.titre || filters.categorieId || filters.statut),
	};
};


