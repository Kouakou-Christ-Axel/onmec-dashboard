"use client";
import React from 'react';
import {useDocumentTable} from "@/features/librairie/hooks/use-document-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {flexRender} from "@tanstack/react-table";
import {librairieTableColumns} from "@/components/(protected)/dashboard/librairie/librairie-table-columns";
import {Link} from "@/i18n/navigation";

function DocumentsListSection() {
	const {
		table,
		filters,
		documents,
	} = useDocumentTable()
	return (
		<div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={librairieTableColumns.length}
								className="h-24 text-center"
							>
								Aucun document <Link href="/dashboard/librairie/ajouter" className="underline text-blue-500">ajoutez en un</Link>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export default DocumentsListSection;