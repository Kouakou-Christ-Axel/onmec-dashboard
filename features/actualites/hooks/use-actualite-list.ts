import useActualitesFilters from "@/features/actualites/hooks/use-actualites-filters";
import {useActualitesListQuery} from "@/features/actualites/queries/actualite-list.query";
import {useMemo} from "react";
import {IActualiteSearchParams} from "@/features/actualites/types/actualite.type";

export function useActualiteList() {
	const {
		filters,
		setFilters,
		handlePageChange
	} = useActualitesFilters();

	const currentSearchParams = useMemo<IActualiteSearchParams>(() => {
		return {
			page: filters.page,
			limit: filters.limit,
			search: filters.search,
			dateFrom: filters.dateFrom,
			dateTo: filters.dateTo,
			hasImage: filters.hasImage || undefined,
		}
	}, [filters]);

	const {data, isLoading, isError} = useActualitesListQuery(currentSearchParams);

	const meta = data?.meta;

	return {
		actualites: data?.data || [],
		meta,
		isLoading,
		isError,
		filters,
		setFilters,
		handlePageChange,
	};
}