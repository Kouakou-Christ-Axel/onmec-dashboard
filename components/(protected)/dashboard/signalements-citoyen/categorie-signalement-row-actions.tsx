"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { ICategorieSignalement } from "@/features/signalements";
import { useSupprimerCategorieMutation } from "@/features/signalements/queries/categorie/categorie-delete.mutation";

export default function CategorieSignalementRowActions({
  categorie,
}: {
  categorie: ICategorieSignalement;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutateAsync: supprimer, isPending } = useSupprimerCategorieMutation();

  const confirmDelete = async () => {
    await supprimer(
      { id: categorie.id },
      { onSuccess: () => setConfirmOpen(false) }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Ouvrir le menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/signalements/categories/${categorie.id}/modifier`}
                className="w-full cursor-pointer"
              >
                Modifier
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setConfirmOpen(true)}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer la catégorie"
        alertMessage="Cette action est irréversible."
        description={
          <>
            Voulez-vous vraiment supprimer la catégorie «{" "}
            <span className="font-semibold">{categorie.nom}</span> » ?
          </>
        }
        confirmLabel="Supprimer"
        confirmColor="danger"
        isLoading={isPending}
      />
    </>
  );
}
