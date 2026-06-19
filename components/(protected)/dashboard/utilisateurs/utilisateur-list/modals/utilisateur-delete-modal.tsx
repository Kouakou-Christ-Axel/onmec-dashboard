"use client";

import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { IUtilisateur } from "@/features/utilisateur/types/utilisateur.type";
import { useSupprimerUtilisateurMutation } from "@/features/utilisateur/queries/utilisateur-delete.mutation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  utilisateur?: IUtilisateur | null;
};

export default function UtilisateurDeleteModal({
  isOpen,
  onClose,
  utilisateur,
}: Props) {
  const { mutateAsync: supprimer, isPending } =
    useSupprimerUtilisateurMutation();

  const confirmDelete = async () => {
    if (!utilisateur?.id) return;
    await supprimer({ id: utilisateur.id }, { onSuccess: () => onClose() });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader>Supprimer l'utilisateur</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-600">
            Êtes-vous sûr de vouloir supprimer définitivement{" "}
            <span className="font-semibold">{utilisateur?.fullname}</span> ?
            Cette action est irréversible.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} disabled={isPending}>
            Annuler
          </Button>
          <Button color="danger" onPress={confirmDelete} isLoading={isPending}>
            Supprimer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
