import { useMemo } from "react";
import { useQueryStates } from 'nuqs';
import { actualiteFiltersClient } from '../filters/actualite.filters';
import { IActualiteSearchParams } from "../types/actualite.type";

export function useActualitesFilters() {
  // Gestion des paramètres d'URL via Nuqs
  const [filters, setFilters] = useQueryStates(
    actualiteFiltersClient.filter,
    actualiteFiltersClient.option
  );

  // Construction des paramètres de recherche
  const currentSearchParams: IActualiteSearchParams = useMemo(() => {
    return {
      search: filters.search || undefined,
      dateFrom: filters.dateFrom || undefined,
      dateTo: filters.dateTo || undefined,
      hasImage: filters.hasImage === null ? undefined : filters.hasImage,
      page: filters.page,
      limit: filters.limit,
    };
  }, [filters]);

  // Gestionnaires de filtres
  const handleTextFilterChange = (field: string, value: string) => {
    setFilters({ [field]: value });
  };

  const handleDateFilterChange = (field: 'dateFrom' | 'dateTo', value: string) => {
    setFilters({ [field]: value });
  };

  const handleImageFilterChange = (value: boolean | undefined) => {
    setFilters({ hasImage: value as any });
  };

  const handleClearAllFilters = () => {
    setFilters({
      search: '',
      dateFrom: '',
      dateTo: '',
      hasImage: undefined as any,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  return {
    filters,
    setFilters,
    currentSearchParams,
    handleTextFilterChange,
    handleDateFilterChange,
    handleImageFilterChange,
    handleClearAllFilters,
    handlePageChange,
  };
}

export default useActualitesFilters;
