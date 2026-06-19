"use client";

import Content from "@/components/primitives/Content";
import { useUtilisateurListTable } from "@/features/utilisateur/hooks/useUtilisateurListTable";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { flexRender } from "@tanstack/react-table";
import { columns } from "./column";
import { HeaderFilter } from "./header-filter";
import UtilisateurFormModal from "./modals/utilisateur-form-modal";
import UtilisateurDeleteModal from "./modals/utilisateur-delete-modal";
import UtilisateurLockModal from "./modals/utilisateur-lock-modal";

export function UtilisateurList() {
  const {
    table,
    isLoading,
    isError,
    isFetching,
    handleTextFilterChange,
    handleEnumFilterChange,
    modalStates,
    modalHandlers,
    currentUser,
    filters,
  } = useUtilisateurListTable({ columns });

  return (
    <Content>
      <HeaderFilter
        handleTextFilterChange={handleTextFilterChange}
        handleEnumFilterChange={handleEnumFilterChange}
        filters={filters}
        modalHandlers={modalHandlers}
      />
      <div className="relative">
        <Table
          classNames={{
            wrapper: isFetching
              ? "opacity-50 bg-primary-50/50 transition-opacity duration-200"
              : "",
            table: isFetching ? "pointer-events-none" : "",
          }}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                page={table.getState().pagination.pageIndex + 1}
                total={table.getPageCount()}
                onChange={(page) => table.setPageIndex(page - 1)}
              />
            </div>
          }
          aria-label="Tableau des utilisateurs"
        >
          <TableHeader>
            {table.getHeaderGroups()[0]?.headers.map((header) => (
              <TableColumn key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableColumn>
            )) || []}
          </TableHeader>
          <TableBody
            items={
              isLoading || isError || !table.getRowModel().rows?.length
                ? []
                : table.getRowModel().rows
            }
            loadingContent="Chargement..."
            emptyContent="Aucun résultat trouvé"
          >
            {(row) => (
              <TableRow key={row.id} className={isFetching ? "opacity-70" : ""}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modale d'ajout */}
      <UtilisateurFormModal
        isOpen={modalStates.addOpen}
        onClose={() => modalHandlers.setAddOpen(false)}
      />

      {/* Modale de modification */}
      <UtilisateurFormModal
        isOpen={modalStates.editOpen}
        onClose={() => modalHandlers.setEditOpen(false)}
        utilisateur={currentUser}
      />

      {/* Modale de suppression */}
      <UtilisateurDeleteModal
        isOpen={modalStates.deleteOpen}
        onClose={() => modalHandlers.setDeleteOpen(false)}
        utilisateur={currentUser}
      />

      {/* Modale de verrouillage / déverrouillage */}
      <UtilisateurLockModal
        isOpen={modalStates.lockUnlockOpen}
        onClose={() => modalHandlers.setLockUnlockOpen(false)}
        utilisateur={currentUser}
      />
    </Content>
  );
}
