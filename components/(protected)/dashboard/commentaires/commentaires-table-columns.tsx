import { ColumnDef } from "@tanstack/react-table";
import { ICommentaire } from "@/features/moderation/types/commentaire.types";
import { formatDateTime } from "@/utils/date.utils";
import { Badge } from "@/components/ui/badge";
import { CommentaireActions } from "./commentaire-actions";

const cibleLabels: Record<string, string> = {
  signalement: "Signalement",
  actualite: "Actualité",
};

export const commentairesTableColumns: ColumnDef<ICommentaire>[] = [
  {
    accessorKey: "auteur",
    header: "Auteur",
    cell: ({ row }) => (
      <span className="text-medium font-medium">
        {row.original.auteur?.nom ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "contenu",
    header: "Commentaire",
    cell: ({ row }) => (
      <p
        title={row.original.contenu}
        className="max-w-sm truncate text-sm text-wrap line-clamp-2"
      >
        {row.original.contenu}
      </p>
    ),
  },
  {
    accessorKey: "cible",
    header: "Cible",
    cell: ({ row }) => {
      const cible = row.original.cible;
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="secondary" className="w-fit">
            {cibleLabels[cible?.type] ?? cible?.type}
          </Badge>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {cible?.titre}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => <time>{formatDateTime(row.original.createdAt)}</time>,
  },
  {
    accessorKey: "masque",
    header: "Statut",
    cell: ({ row }) =>
      row.original.masque ? (
        <Badge variant="destructive">Masqué</Badge>
      ) : (
        <Badge variant="default">Visible</Badge>
      ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CommentaireActions commentaire={row.original} />,
  },
];
