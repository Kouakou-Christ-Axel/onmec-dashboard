"use client";
import React from "react";
import { useCommentaireTable } from "@/features/moderation/hooks/use-commentaire-table";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tab,
} from "@heroui/react";
import { flexRender } from "@tanstack/react-table";
import { commentairesTableColumns } from "@/components/(protected)/dashboard/commentaires/commentaires-table-columns";
import { CibleType } from "@/features/moderation/types/commentaire.types";

function CommentairesListSection() {
  const {
    table,
    filters,
    isLoading,
    isError,
    error,
    isFetching,
    handlePageChange,
    handleCibleChange,
    page,
    totalPages,
  } = useCommentaireTable();

  return (
    <div className="flex flex-col space-y-4">
      <Tabs
        aria-label="Filtrer par type de cible"
        selectedKey={filters.cible}
        onSelectionChange={(key) => handleCibleChange(key as CibleType)}
        variant="bordered"
        color="primary"
      >
        <Tab key="signalement" title="Signalements" />
        <Tab key="actualite" title="Actualités" />
      </Tabs>
      <Table
        isStriped
        aria-label="Tableau des commentaires"
        bottomContent={
          (totalPages || 1) > 1 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                total={totalPages || 1}
                onChange={(p) => handlePageChange(p)}
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
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {commentairesTableColumns.map((col) => (
                  <TableCell
                    key={`skeleton-cell-${col.id ?? col.header}`}
                    className="h-12"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={commentairesTableColumns.length}
                className="h-24 text-center"
              >
                <div className="text-destructive">
                  Erreur lors du chargement des données
                  {error?.message && `: ${error.message}`}
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={isFetching ? "opacity-70" : ""}
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
                colSpan={commentairesTableColumns.length}
                className="h-24 text-center"
              >
                Aucun commentaire à modérer pour le moment.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CommentairesListSection;
