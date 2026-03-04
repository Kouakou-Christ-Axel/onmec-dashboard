'use client';

import { useCategoriesListQuery } from "@/features/signalements/queries";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { categorieSignalementTableColumns } from "@/components/(protected)/dashboard/signalements-citoyen/categorie-signalement-table-columns";
import { useState } from "react";

export function useCategorieTable() {
	// État local pour les filtres simples (pas de sync URL pour les catégories)
	const [filters, setFilters] = useState({
		search: "",
		page: 1,
		limit: 20,
	});

	// Query pour récupérer les catégories
	const { data, isLoading, isError, error, isFetching } = useCategoriesListQuery();
	const categories = data || [];

	// Filtrer les catégories localement selon la recherche
	const filteredCategories = categories.filter(cat =>
		cat.nom.toLowerCase().includes(filters.search.toLowerCase()) ||
		cat.description?.toLowerCase().includes(filters.search.toLowerCase())
	);

	// Paginer les catégories filtrées
	const startIndex = (filters.page - 1) * filters.limit;
	const endIndex = startIndex + filters.limit;
	const paginatedCategories = filteredCategories.slice(startIndex, endIndex);

	// Table React Table
	const table = useReactTable({
		data: paginatedCategories,
		columns: categorieSignalementTableColumns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		state: {
			pagination: {
				pageSize: filters.limit,
				pageIndex: filters.page - 1, // React Table utilise 0-indexed
			},
		},
		onPaginationChange: (updater) => {
			const newState = typeof updater === 'function'
				? updater(table.getState().pagination)
				: updater;
			setFilters(prev => ({
				...prev,
				page: newState.pageIndex + 1, // Convertir en 1-indexed
				limit: newState.pageSize,
			}));
		},
	});

	// Handlers pour les filtres
	const handleSearchChange = (search: string) => {
		setFilters(prev => ({
			...prev,
			search,
			page: 1, // Réinitialiser à la page 1
		}));
	};

	const handlePageChange = (page: number) => {
		setFilters(prev => ({ ...prev, page }));
	};

	const handleLimitChange = (limit: number) => {
		setFilters(prev => ({
			...prev,
			limit,
			page: 1,
		}));
	};

	// Métadonnées de pagination
	const meta = {
		total: filteredCategories.length,
		page: filters.page,
		limit: filters.limit,
		totalPages: Math.ceil(filteredCategories.length / filters.limit),
	};

	return {
		// Table
		table,
		categories: paginatedCategories,
		allCategories: categories, // Toutes les catégories pour d'autres usages
		meta,

		// État
		isLoading,
		isError,
		isFetching,
		error,

		// Filtres
		filters,
		setFilters,

		// Handlers
		handleSearchChange,
		handlePageChange,
		handleLimitChange,

		// Utilitaires
		isFiltered: filters.search !== "",
		resetFilters: () => setFilters({ search: "", page: 1, limit: 20 }),
	};
}
