import { useMemo } from "react";
import { useQueryStates } from 'nuqs';
import { quizzFiltersClient } from '../filters/quizz.filters';
import { IQuizzSearchParams, QuizDifficulte } from "../types/quizz.type";

export function useQuizzFilters() {
  // Gestion des paramètres d'URL via Nuqs
  const [filters, setFilters] = useQueryStates(
    quizzFiltersClient.filter,
    quizzFiltersClient.option
  );

  // Construction des paramètres de recherche envoyés à l'API
  const currentSearchParams: IQuizzSearchParams = useMemo(() => {
    return {
      search: filters.search || undefined,
      categorieId: filters.categorieId || undefined,
      difficulte: (filters.difficulte || undefined) as QuizDifficulte | undefined,
      page: filters.page,
      limit: filters.limit,
    };
  }, [filters]);

  // Gestionnaires de filtres
  const handleTextFilterChange = (field: string, value: string) => {
    setFilters({ [field]: value, page: 1 });
  };

  const handleCategorieChange = (value: string) => {
    setFilters({ categorieId: value, page: 1 });
  };

  const handleDifficulteChange = (value: string) => {
    setFilters({ difficulte: value, page: 1 });
  };

  const handleClearAllFilters = () => {
    setFilters({
      search: '',
      categorieId: '',
      difficulte: '',
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
    handleCategorieChange,
    handleDifficulteChange,
    handleClearAllFilters,
    handlePageChange,
  };
}

export default useQuizzFilters;
