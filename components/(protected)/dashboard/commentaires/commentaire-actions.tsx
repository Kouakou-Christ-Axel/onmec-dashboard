"use client";

import React from "react";
import { Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ICommentaire } from "@/features/moderation/types/commentaire.types";
import { useMasquerCommentaireMutation } from "@/features/moderation/queries/commentaire-masquer.mutation";
import { useSupprimerCommentaireMutation } from "@/features/moderation/queries/commentaire-delete.mutation";

interface CommentaireActionsProps {
  commentaire: ICommentaire;
}

export function CommentaireActions({ commentaire }: CommentaireActionsProps) {
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const { mutate: masquerCommentaire, isPending: isMasquerPending } =
    useMasquerCommentaireMutation();
  const { mutate: supprimerCommentaire, isPending: isSupprimerPending } =
    useSupprimerCommentaireMutation();

  const handleToggleMasque = () => {
    masquerCommentaire({ id: commentaire.id, masque: !commentaire.masque });
  };

  const handleSupprimer = () => {
    supprimerCommentaire(
      { id: commentaire.id },
      {
        onSuccess: () => setOpenConfirm(false),
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={isMasquerPending}
        onClick={handleToggleMasque}
      >
        {isMasquerPending ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : commentaire.masque ? (
          <Eye className="mr-1 h-4 w-4" />
        ) : (
          <EyeOff className="mr-1 h-4 w-4" />
        )}
        {commentaire.masque ? "Afficher" : "Masquer"}
      </Button>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-1 h-4 w-4" />
            Supprimer
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le commentaire</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer définitivement ce commentaire de
              {" "}
              <strong>{commentaire.auteur?.nom}</strong> ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSupprimerPending}>
                Annuler
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isSupprimerPending}
              onClick={handleSupprimer}
            >
              {isSupprimerPending && (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              )}
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CommentaireActions;
