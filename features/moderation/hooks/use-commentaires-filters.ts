import { useMemo } from "react";
import { useQueryStates } from "nuqs";
import { commentaireFiltersClient } from "../filters/commentaire.filters";
import {
  CibleType,
  ICommentaireSearchParams,
} from "../types/commentaire.types";

export function useCommentairesFilters() {
  // Gestion des paramètres d'URL via Nuqs
  const [filters, setFilters] = useQueryStates(
    commentaireFiltersClient.filter,
    commentaireFiltersClient.option
  );

  // Construction des paramètres de recherche
  const currentSearchParams: ICommentaireSearchParams = useMemo(() => {
    return {
      cible: filters.cible || undefined,
      page: filters.page,
      limit: filters.limit,
    };
  }, [filters]);

  const handleCibleChange = (cible: CibleType) => {
    setFilters({ cible, page: 1 });
  };

  const handleClearAllFilters = () => {
    setFilters({
      cible: "signalement",
      page: 1,
      limit: 20,
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
    handleCibleChange,
  };
}

export default useCommentairesFilters;
