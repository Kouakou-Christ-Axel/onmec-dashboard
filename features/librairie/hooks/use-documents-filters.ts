import { useMemo } from "react";
import { useQueryStates } from 'nuqs';
import { actualiteFiltersClient } from '../filters/document.filters';
import {IDocumentSearchParams} from "@/features/librairie/types/document.types";

export function useDocumentsFilters() {
  // Gestion des paramètres d'URL via Nuqs
  const [filters, setFilters] = useQueryStates(
    actualiteFiltersClient.filter,
    actualiteFiltersClient.option
  );

  // Construction des paramètres de recherche
  const currentSearchParams: IDocumentSearchParams = useMemo(() => {
    return {
      title: filters.title || undefined,
      page: filters.page,
      limit: filters.limit,
    };
  }, [filters]);

  const handleTitleChange = (title: string) => {
    setFilters({ title, page: 1 });
  }

  const handleClearAllFilters = () => {
    setFilters({
      title: '',
      page: 1,
      limit: 20
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  return {
    filters,
    setFilters,
    currentSearchParams,
    handleClearAllFilters,
    handlePageChange,
    handleTitleChange,
  };
}

export default useDocumentsFilters;
