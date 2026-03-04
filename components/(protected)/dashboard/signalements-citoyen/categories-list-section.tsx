'use client';

import React from 'react';
import { useCategorieTable } from '@/features/signalements/hooks/use-categorie-table';
import { Input, Pagination, Spinner, Table as UITable, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Search, X } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';

export default function CategoriesListSection() {
	const {
		table,
		categories,
		allCategories,
		meta,
		isLoading,
		isError,
		error,
		filters,
		handleSearchChange,
		handlePageChange,
		resetFilters,
		isFiltered,
	} = useCategorieTable();

	if (isError) {
		return (
			<div className="text-center py-10">
				<p className="text-red-500">Erreur lors du chargement des catégories</p>
				{error && <p className="text-sm text-gray-500">{error.message}</p>}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Filtres */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{/* Recherche */}
				<Input
					isClearable
					placeholder="Rechercher une catégorie..."
					startContent={<Search className="w-4 h-4" />}
					value={filters.search}
					onValueChange={handleSearchChange}
					onClear={() => handleSearchChange("")}
					className="md:col-span-2"
				/>

				{/* Bouton réinitialiser */}
				{isFiltered && (
					<button
						onClick={resetFilters}
						className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
					>
						<X className="w-4 h-4" />
						Réinitialiser
					</button>
				)}
			</div>

			{/* Informations */}
			<div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
				Total: <strong>{allCategories.length}</strong> catégories
				{isFiltered && ` - Affichage: ${categories.length}`}
			</div>

			{/* Table */}
			<UITable
				isStriped
				bottomContent={
					(meta?.totalPages || 1) > 1 && (
						<div className="flex w-full justify-center">
							<Pagination
								isCompact
								showControls
								showShadow
								page={meta?.page}
								total={meta?.totalPages || 1}
								onChange={(page) => handlePageChange(page)}
							/>
						</div>
					)
				}
			>
				<TableHeader>
					{table.getFlatHeaders().map((header) => (
						<TableColumn key={header.id}>
							{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody
					isLoading={isLoading}
					loadingContent={<Spinner label="Chargement..." />}
					emptyContent="Aucune catégorie"
				>
					{isLoading ? (
						Array.from({length: 10}).map((_, i) => (
							<TableRow key={`skeleton-${i}`}>
								{table.getFlatHeaders().map((header) => (
									<TableCell key={`skeleton-cell-${header.id}`} className="h-12">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"/>
									</TableCell>
								))}
							</TableRow>
						))
					) : isError ? (
						<TableRow>
							<TableCell colSpan={table.getFlatHeaders().length} className="h-24 text-center">
								<div className="text-red-500">
									Erreur lors du chargement des catégories
									{error?.message && `: ${error.message}`}
								</div>
							</TableCell>
						</TableRow>
					) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
								className={isLoading ? 'opacity-70' : ''}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={table.getFlatHeaders().length}
								className="h-24 text-center"
							>
								Aucune catégorie trouvée
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</UITable>


			{/* Résumé */}
			{meta && (
				<div className="text-sm text-gray-600 dark:text-gray-400">
					Affichage de <strong>{categories.length}</strong> sur{' '}
					<strong>{meta.total}</strong> catégories - Page{' '}
					<strong>{meta.page}</strong> sur <strong>{meta.totalPages}</strong>
				</div>
			)}
		</div>
	);
}
