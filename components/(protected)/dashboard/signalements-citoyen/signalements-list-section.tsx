'use client';

import React from 'react';
import {useSignalementTable} from '@/features/signalements/hooks/use-signalement-table';
import {
	Button,
	Input,
	Pagination,
	Spinner,
	Table as UITable,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@heroui/react';
import {Search, X} from 'lucide-react';
import {useCategoriesListQuery} from '@/features/signalements/queries';
import {flexRender} from '@tanstack/react-table';

export default function SignalementsListSection() {
	const {
		table,
		signalements,
		meta,
		isLoading,
		isError,
		error,
		filters,
		handleTitleChange,
		handleCategorieChange,
		handleStatutChange,
		handlePageChange,
		resetFilters,
		isFiltered,
	} = useSignalementTable();

	// Récupérer les catégories pour le select
	const {data: categories = []} = useCategoriesListQuery();

	if (isError) {
		return (
			<div className="text-center py-10">
				<p className="text-red-500">Erreur lors du chargement des signalements</p>
				{error && <p className="text-sm text-gray-500">{error.message}</p>}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Filtres */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
				{/* Recherche par titre */}
				<Input
					isClearable
					placeholder="Rechercher par titre..."
					startContent={<Search className="w-4 h-4"/>}
					value={filters.titre}
					onValueChange={handleTitleChange}
					onClear={() => handleTitleChange("")}
					className="md:col-span-1"
				/>

				{/* Filtre par catégorie */}
				<select
					value={filters.categorieId}
					onChange={(e) => handleCategorieChange(e.target.value)}
					className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
				>
					<option value="">Toutes les catégories</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.nom}
						</option>
					))}
				</select>

				{/* Filtre par statut */}
				<select
					value={filters.statut}
					onChange={(e) => handleStatutChange(e.target.value)}
					className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
				>
					<option value="">Tous les statuts</option>
					<option value="NOUVEAU">Nouveau</option>
					<option value="EN_COURS">En cours</option>
					<option value="RESOLU">Résolu</option>
					<option value="REJETE">Rejeté</option>
				</select>

				{/* Bouton réinitialiser */}
				{isFiltered && (
					<Button
						color="danger"
						onPress={resetFilters}
					>
						<X className="w-4 h-4"/>
						Réinitialiser
					</Button>
				)}
			</div>

			<div className="overflow-x-auto">
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
						loadingContent={<Spinner label="Chargement..."/>}
						emptyContent="Aucun signalement"
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
										Erreur lors du chargement des signalements
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
									Aucun signalement trouvé
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</UITable>
			</div>

			{/* Résumé */}
			{meta && (
				<div className="text-sm text-gray-600 dark:text-gray-400">
					Affichage de <strong>{signalements.length}</strong> sur{' '}
					<strong>{meta.total}</strong> signalements - Page{' '}
					<strong>{meta.page}</strong> sur <strong>{meta.totalPages}</strong>
				</div>
			)}
		</div>
	);
}
