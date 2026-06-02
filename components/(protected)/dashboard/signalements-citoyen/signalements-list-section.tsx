'use client';

import React from 'react';
import {useSignalementTable} from '@/features/signalements/hooks/use-signalement-table';
import {
	Button,
	Input,
	Pagination,
	Select,
	SelectItem,
	Spinner,
	Table as UITable,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import {Search, X} from 'lucide-react';
import {useCategoriesListQuery} from '@/features/signalements/queries';
import {flexRender} from '@tanstack/react-table';

const STATUTS = [
	{key: 'NOUVEAU', label: 'Nouveau'},
	{key: 'EN_COURS', label: 'En cours'},
	{key: 'RESOLU', label: 'Résolu'},
	{key: 'REJETE', label: 'Rejeté'},
];

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

	const {data: categories = []} = useCategoriesListQuery();

	if (isError) {
		return (
			<div className="text-center py-10">
				<p className="text-danger-500">Erreur lors du chargement des signalements</p>
				{error && <p className="text-sm text-default-500">{error.message}</p>}
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Filtres */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
				<Input
					isClearable
					placeholder="Rechercher par titre..."
					startContent={<Search className="w-4 h-4" />}
					value={filters.titre}
					onValueChange={handleTitleChange}
					onClear={() => handleTitleChange('')}
				/>

				<Select
					placeholder="Toutes les catégories"
					selectedKeys={filters.categorieId ? new Set([filters.categorieId]) : new Set()}
					onSelectionChange={(keys) => {
						const selected = Array.from(keys as Set<string>)[0] ?? '';
						handleCategorieChange(selected);
					}}
				>
					{categories.map((cat) => (
						<SelectItem key={cat.id}>{cat.nom}</SelectItem>
					))}
				</Select>

				<Select
					placeholder="Tous les statuts"
					selectedKeys={filters.statut ? new Set([filters.statut]) : new Set()}
					onSelectionChange={(keys) => {
						const selected = Array.from(keys as Set<string>)[0] ?? '';
						handleStatutChange(selected);
					}}
				>
					{STATUTS.map((s) => (
						<SelectItem key={s.key}>{s.label}</SelectItem>
					))}
				</Select>

				{isFiltered && (
					<Button color="danger" variant="flat" onPress={resetFilters}>
						<X className="w-4 h-4" />
						Réinitialiser
					</Button>
				)}
			</div>

			<div className="overflow-x-auto">
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
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.header, header.getContext())}
							</TableColumn>
						))}
					</TableHeader>
					<TableBody
						isLoading={isLoading}
						loadingContent={<Spinner label="Chargement..." />}
						emptyContent="Aucun signalement"
					>
						{isLoading
							? Array.from({length: 10}).map((_, i) => (
									<TableRow key={`skeleton-${i}`}>
										{table.getFlatHeaders().map((header) => (
											<TableCell key={`skeleton-cell-${header.id}`} className="h-12">
												<div className="h-4 bg-default-200 rounded w-full" />
											</TableCell>
										))}
									</TableRow>
								))
							: table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))}
					</TableBody>
				</UITable>
			</div>

			{meta && (
				<p className="text-sm text-default-500">
					<strong>{signalements.length}</strong> sur <strong>{meta.total}</strong> signalements
					&nbsp;&mdash; page <strong>{meta.page}</strong> / <strong>{meta.totalPages}</strong>
				</p>
			)}
		</div>
	);
}
