'use client';

import { useSignalementCitoyenFilters } from '@/features/signalements';
import { useSignalementsListQuery } from '@/features/signalements/queries';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { signalementCitoyenTableColumns } from '@/components/(protected)/dashboard/signalements-citoyen/signalement-citoyen-table-columns';

export function useSignalementTable() {
	// Gestion des filtres avec URL sync
	const {
		titre,
		categorieId,
		statut,
		page,
		limit,
		setFilters,
		updateFilter,
		searchParams,
		resetFilters,
		isFiltered,
	} = useSignalementCitoyenFilters();

	// Query pour récupérer les signalements
	const { data, isLoading, isError, error, isFetching } = useSignalementsListQuery(searchParams);
	const signalements = data?.data || [];
	const meta = data?.meta;

	// Objet filtres pour simplicité
	const filters = { titre, categorieId, statut, page, limit };

	// Table React Table
	const table = useReactTable({
		data: signalements,
		columns: signalementCitoyenTableColumns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		state: {
			pagination: {
				pageSize: meta?.limit || limit,
				pageIndex: (meta?.page || page) - 1, // React Table utilise 0-indexed
			},
		},
		onPaginationChange: (updater) => {
			const newState = typeof updater === 'function'
				? updater(table.getState().pagination)
				: updater;
			updateFilter('page', newState.pageIndex + 1); // Convertir en 1-indexed
			updateFilter('limit', newState.pageSize);
		},
	});

	// Handlers pour les filtres
	const handleTitleChange = async (titre: string) => {
		await updateFilter('titre', titre);
		await updateFilter('page', 1); // Réinitialiser à la page 1
	};

	const handleCategorieChange = async (categorieId: string) => {
		await updateFilter('categorieId', categorieId);
		await updateFilter('page', 1);
	};

	const handleStatutChange = async (statut: string) => {
		await updateFilter('statut', statut);
		await updateFilter('page', 1);
	};

	const handlePageChange = async (page: number) => {
		await updateFilter('page', page);
	};

	const handleLimitChange = async (limit: number) => {
		await updateFilter('limit', limit);
		await updateFilter('page', 1);
	};

	return {
		// Table
		table,
		signalements,
		meta,

		// État
		isLoading,
		isError,
		isFetching,
		error,

		// Filtres
		filters,
		setFilters,
		updateFilter,
		searchParams,
		resetFilters,
		isFiltered,

		// Handlers
		handleTitleChange,
		handleCategorieChange,
		handleStatutChange,
		handlePageChange,
		handleLimitChange,
	};
}




