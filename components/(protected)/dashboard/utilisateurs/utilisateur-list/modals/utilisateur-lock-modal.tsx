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
import { useVerrouillerUtilisateurMutation } from "@/features/utilisateur/queries/utilisateur-lock.mutation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  utilisateur?: IUtilisateur | null;
};

export default function UtilisateurLockModal({
  isOpen,
  onClose,
  utilisateur,
}: Props) {
  const isLocked = Boolean(utilisateur?.deletedAt);
  const { mutateAsync: verrouiller, isPending } =
    useVerrouillerUtilisateurMutation();

  const confirm = async () => {
    if (!utilisateur?.id) return;
    await verrouiller(
      { id: utilisateur.id, locked: !isLocked },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader>
          {isLocked ? "Déverrouiller l'utilisateur" : "Verrouiller l'utilisateur"}
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-600">
            {isLocked ? (
              <>
                Voulez-vous réactiver le compte de{" "}
                <span className="font-semibold">{utilisateur?.fullname}</span> ?
                L'utilisateur pourra de nouveau se connecter.
              </>
            ) : (
              <>
                Voulez-vous désactiver le compte de{" "}
                <span className="font-semibold">{utilisateur?.fullname}</span> ?
                L'utilisateur ne pourra plus se connecter.
              </>
            )}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} disabled={isPending}>
            Annuler
          </Button>
          <Button
            color={isLocked ? "success" : "warning"}
            onPress={confirm}
            isLoading={isPending}
          >
            {isLocked ? "Déverrouiller" : "Verrouiller"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
