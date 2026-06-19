"use client";

import React from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

type ConfirmColor = "primary" | "danger" | "warning" | "success";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: React.ReactNode;
  /** Message mis en avant dans une alerte HeroUI */
  alertMessage?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: ConfirmColor;
  isLoading?: boolean;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  alertMessage,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  confirmColor = "danger",
  isLoading = false,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody className="space-y-3">
          {alertMessage && (
            <Alert color={confirmColor} variant="flat" title={alertMessage} />
          )}
          {description && (
            <p className="text-sm text-default-600">{description}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button color={confirmColor} onPress={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
