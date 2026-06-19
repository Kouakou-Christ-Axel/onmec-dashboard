"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  UtilisateurAddDTO,
  UtilisateurAddSchema,
} from "@/features/utilisateur/schema/utilisateur.schema";
import {
  IUtilisateur,
  UtilisateurRole,
} from "@/features/utilisateur/types/utilisateur.type";
import { getUtilisateurRole } from "@/features/utilisateur/utils/getUtilisateurRole";
import { getEnumValues } from "@/utils/getEnumValues";
import { useAjouterUtilisateurMutation } from "@/features/utilisateur/queries/utilisateur-add.mutation";
import { useModifierProfilMutation } from "@/features/utilisateur/queries/utilisateur-update.mutation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  utilisateur?: IUtilisateur | null;
};

export default function UtilisateurFormModal({
  isOpen,
  onClose,
  utilisateur,
}: Props) {
  const isEdit = Boolean(utilisateur?.id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UtilisateurAddDTO>({
    resolver: zodResolver(UtilisateurAddSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      role: UtilisateurRole.MEMBER,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        fullname: utilisateur?.fullname ?? "",
        email: utilisateur?.email ?? "",
        phone: utilisateur?.phone ?? "",
        role: (utilisateur?.role as UtilisateurRole) ?? UtilisateurRole.MEMBER,
      });
    }
  }, [isOpen, utilisateur, reset]);

  const { mutateAsync: ajouter, isPending: isAdding } =
    useAjouterUtilisateurMutation();
  const { mutateAsync: modifier, isPending: isUpdating } =
    useModifierProfilMutation();

  const isLoading = isAdding || isUpdating;

  const onSubmit = async (data: UtilisateurAddDTO) => {
    if (isEdit && utilisateur?.id) {
      await modifier(
        { id: utilisateur.id, data },
        { onSuccess: () => onClose() }
      );
    } else {
      await ajouter({ data }, { onSuccess: () => onClose() });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
          </ModalHeader>
          <ModalBody className="space-y-2">
            <Input
              label="Nom complet"
              placeholder="Ex: Jean Dupont"
              variant="bordered"
              {...register("fullname")}
              isInvalid={Boolean(errors.fullname)}
              errorMessage={errors.fullname?.message}
            />
            <Input
              label="Email"
              type="email"
              placeholder="jean.dupont@exemple.com"
              variant="bordered"
              {...register("email")}
              isInvalid={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Téléphone"
              placeholder="+2250707070707"
              variant="bordered"
              {...register("phone")}
              isInvalid={Boolean(errors.phone)}
              errorMessage={errors.phone?.message}
            />
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select
                  label="Rôle"
                  placeholder="Choisir un rôle"
                  variant="bordered"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) =>
                    field.onChange((Array.from(keys)[0] as string) ?? "")
                  }
                  isInvalid={Boolean(errors.role)}
                  errorMessage={errors.role?.message}
                >
                  {getEnumValues(UtilisateurRole).map((role) => (
                    <SelectItem key={role}>
                      {getUtilisateurRole(role as UtilisateurRole).label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              type="button"
              onPress={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              {isEdit ? "Enregistrer" : "Créer"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
