"use client";
import React from 'react';
import {useDocumentTable} from "@/features/librairie/hooks/use-document-table";
import {Input, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@heroui/react';
import {flexRender} from "@tanstack/react-table";
import {librairieTableColumns} from "@/components/(protected)/dashboard/librairie/librairie-table-columns";
import {Link} from "@/i18n/navigation";
import {SearchIcon} from "lucide-react";

function DocumentsListSection() {
	const {
		table,
		filters,
		isLoading,
		isError,
		error,
		isFetching,
		handlePageChange,
		handleTitleChange,
		meta
	} = useDocumentTable()
	return (
		<div className="flex flex-col space-y-4">
			<Input
				isClearable
				classNames={{
					base: "w-full sm:max-w-[44%]",
					inputWrapper: "border-1",
				}}
				placeholder="Search by name..."
				size="sm"
				startContent={<SearchIcon className="text-default-300"/>}
				value={filters.title}
				variant="bordered"
				onClear={() => handleTitleChange('')}
				onValueChange={(value) => handleTitleChange(value)}
			/>
			<Table
				isStriped
				bottomContent={
					(meta?.totalPages || 1) > 1 && (<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							page={meta?.page}
							total={meta?.totalPages || 1}
							onChange={(page) => handlePageChange(page)}
						/>
					</div>)
				}
			>
				<TableHeader>
					{table.getFlatHeaders().map((header) => (
						<TableColumn key={header.id}>
							{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{isLoading ? (
						Array.from({length: 10}).map((_, i) => (
							<TableRow key={`skeleton-${i}`}>
								{librairieTableColumns.map((col) => (
									<TableCell key={`skeleton-cell-${col.header}`} className="h-12">
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"/>
									</TableCell>
								))}
							</TableRow>
						))
					) : isError ? (
						<TableRow>
							<TableCell colSpan={librairieTableColumns.length} className="h-24 text-center">
								<div className="text-destructive">
									Erreur lors du chargement des données
									{error?.message && `: ${error.message}`}
								</div>
							</TableCell>
						</TableRow>
					) : table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id} data-state={row.getIsSelected() && 'selected'}
								className={isFetching ? 'opacity-70' : ''}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={librairieTableColumns.length}
								className="h-24 text-center"
							>
								Aucun document <Link href="/dashboard/librairie/ajouter" className="underline text-blue-500">ajoutez en
								un</Link>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export default DocumentsListSection;