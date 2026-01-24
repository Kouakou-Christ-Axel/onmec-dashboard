import useDocumentsFilters from "@/features/librairie/hooks/use-documents-filters";
import {useDocumentsListQuery} from "@/features/librairie/queries/document-list.query";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {librairieTableColumns} from "@/components/(protected)/dashboard/librairie/librairie-table-columns";

export function useDocumentTable() {
	const {
		filters,
		setFilters,
		handlePageChange,
		currentSearchParams,
		handleTitleChange,
	} = useDocumentsFilters();

	const {data, isLoading, isError, error, isFetching} = useDocumentsListQuery(currentSearchParams);
	const documents = data?.data || []
	const meta = data?.meta;

	const table = useReactTable({
		data: documents,
		columns: librairieTableColumns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		state: {
			pagination: {
				pageSize: meta?.limit || filters.limit,
				pageIndex: meta?.page || filters.page
			}
		},
		onPaginationChange: (updater) => {
			const newState = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
			setFilters(prev => ({
				...prev,
				page: newState.pageIndex + 1,
				limit: newState.pageSize,
			}));
		},
	})

	return {
		table,
		documents,
		meta,
		isLoading,
		isError,
		isFetching,
		error,
		filters,
		setFilters,
		handlePageChange,
		handleTitleChange
	};
}