"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MoreHorizontal, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { ISignalement } from "@/features/signalements";
import { useSupprimerSignalementMutation } from "@/features/signalements/queries/signalement/signalement-delete.mutation";
import {
  useChangerStatutSignalementMutation,
  useValiderSignalementMutation,
} from "@/features/signalements/queries/signalement/signalement-statut.mutation";

const STATUTS: { value: ISignalement["statut"]; label: string }[] = [
  { value: "NOUVEAU", label: "Nouveau" },
  { value: "EN_COURS", label: "En cours" },
  { value: "RESOLU", label: "Résolu" },
  { value: "REJETE", label: "Rejeté" },
];

export default function SignalementRowActions({
  signalement,
}: {
  signalement: ISignalement;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutateAsync: supprimer, isPending: isDeleting } =
    useSupprimerSignalementMutation();
  const { mutate: changerStatut } = useChangerStatutSignalementMutation();
  const { mutate: valider } = useValiderSignalementMutation();

  const confirmDelete = async () => {
    await supprimer(
      { id: signalement.id },
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
                href={`/dashboard/signalements/${signalement.id}`}
                className="w-full cursor-pointer"
              >
                Voir les détails
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/signalements/${signalement.id}/modifier`}
                className="w-full cursor-pointer"
              >
                Modifier
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Validation</DropdownMenuLabel>
          {signalement.validation ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => valider({ id: signalement.id, validation: false })}
            >
              <XCircle className="mr-2 h-4 w-4 text-gray-500" />
              Invalider
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer text-green-600 focus:text-green-600"
              onClick={() => valider({ id: signalement.id, validation: true })}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Valider
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
          {STATUTS.map((s) => (
            <DropdownMenuItem
              key={s.value}
              disabled={signalement.statut === s.value}
              className="cursor-pointer"
              onClick={() =>
                changerStatut({ id: signalement.id, statut: s.value })
              }
            >
              {s.label}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setConfirmOpen(true)}
            className="text-red-600 focus:text-red-600 cursor-pointer"
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer le signalement"
        alertMessage="Cette action est irréversible."
        description={
          <>
            Voulez-vous vraiment supprimer le signalement «{" "}
            <span className="font-semibold">{signalement.titre}</span> » ?
          </>
        }
        confirmLabel="Supprimer"
        confirmColor="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
