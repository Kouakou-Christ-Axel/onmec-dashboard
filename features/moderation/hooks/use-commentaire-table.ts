import useCommentairesFilters from "@/features/moderation/hooks/use-commentaires-filters";
import { useCommentairesListQuery } from "@/features/moderation/queries/commentaire-list.query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { commentairesTableColumns } from "@/components/(protected)/dashboard/commentaires/commentaires-table-columns";

export function useCommentaireTable() {
  const {
    filters,
    setFilters,
    handlePageChange,
    handleCibleChange,
    currentSearchParams,
  } = useCommentairesFilters();

  const { data, isLoading, isError, error, isFetching } =
    useCommentairesListQuery(currentSearchParams);

  const commentaires = data?.data || [];
  const total = data?.total ?? 0;
  const page = data?.page ?? filters.page;
  const limit = data?.limit ?? filters.limit;
  const totalPages = limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1;

  const table = useReactTable({
    data: commentaires,
    columns: commentairesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageSize: limit,
        pageIndex: page,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setFilters((prev) => ({
        ...prev,
        page: newState.pageIndex + 1,
        limit: newState.pageSize,
      }));
    },
  });

  return {
    table,
    commentaires,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    isError,
    isFetching,
    error,
    filters,
    setFilters,
    handlePageChange,
    handleCibleChange,
  };
}
