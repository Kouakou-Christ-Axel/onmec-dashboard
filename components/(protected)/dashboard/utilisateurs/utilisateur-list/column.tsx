"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lock, SquarePen, Trash2, Unlock } from "lucide-react";

import {
  IUtilisateur,
  UtilisateurRole,
  UtilisateurStatus,
} from "@/features/utilisateur/types/utilisateur.type";
import { getUtilisateurRole } from "@/features/utilisateur/utils/getUtilisateurRole";
import { getUtilisateurStatus } from "@/features/utilisateur/utils/getUtilisateurStatus";
import { Button, Chip, Tooltip, User } from "@heroui/react";

export const columns: ColumnDef<IUtilisateur>[] = [
  {
    accessorKey: "fullname",
    header: "Nom Complet",
    cell: ({ row }) => {
      const user = row.original;
      return <User name={`${user.fullname}`}>{user.email}</User>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => <span>{row.getValue("phone") || "—"}</span>,
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => {
      const role = row.getValue<UtilisateurRole>("role");
      const roleName = getUtilisateurRole(role);

      return (
        <Chip
          className="capitalize"
          color={roleName.color}
          size="sm"
          variant="flat"
        >
          {roleName.label}
        </Chip>
      );
    },
  },
  {
    id: "status",
    header: "Statut",
    accessorFn: (row) =>
      row.deletedAt ? UtilisateurStatus.INACTIVE : UtilisateurStatus.ACTIVE,
    cell: ({ getValue }) => {
      const status = getValue<UtilisateurStatus>();
      const statusName = getUtilisateurStatus(status);
      return (
        <Chip
          className="capitalize"
          color={statusName.color}
          size="sm"
          variant="flat"
        >
          {statusName.label}
        </Chip>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const user = row.original as IUtilisateur;
      const isLocked = Boolean(user.deletedAt);

      const meta = table.options.meta as {
        onEdit: (user: IUtilisateur) => void;
        onDelete: (user: IUtilisateur) => void;
        onLockUnlock: (user: IUtilisateur) => void;
      };

      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Modifier">
            <Button
              variant="bordered"
              isIconOnly
              onPress={() => meta.onEdit(user)}
              size="sm"
            >
              <SquarePen className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content={isLocked ? "Déverrouiller" : "Verrouiller"}>
            <Button
              variant="bordered"
              color={isLocked ? "success" : "warning"}
              isIconOnly
              onPress={() => meta.onLockUnlock(user)}
              size="sm"
            >
              {isLocked ? (
                <Unlock className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </Button>
          </Tooltip>

          <Tooltip content="Supprimer">
            <Button
              variant="bordered"
              color="danger"
              isIconOnly
              onPress={() => meta.onDelete(user)}
              size="sm"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      );
    },
  },
];
