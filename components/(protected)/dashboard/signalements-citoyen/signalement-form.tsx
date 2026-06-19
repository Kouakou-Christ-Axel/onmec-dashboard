"use client";

import React, { useEffect } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useRouter } from "@/i18n/navigation";
import {
  SignalementCreateDTO,
  SignalementCreateSchema,
} from "@/features/signalements/schema/signalement.schema";
import { ISignalement } from "@/features/signalements/types/signalement.types";
import { useCategoriesListQuery } from "@/features/signalements/queries/categorie/categorie-list.query";
import { useAjouterSignalementMutation } from "@/features/signalements/queries/signalement/signalement-add.mutation";
import { useModifierSignalementMutation } from "@/features/signalements/queries/signalement/signalement-update.mutation";

const STATUTS: SignalementCreateDTO["statut"][] = [
  "NOUVEAU",
  "EN_COURS",
  "RESOLU",
  "REJETE",
];

type Props = {
  signalement?: ISignalement | null;
};

export default function SignalementForm({ signalement }: Props) {
  const router = useRouter();
  const isEdit = Boolean(signalement?.id);

  const { data: categories } = useCategoriesListQuery();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignalementCreateDTO>({
    resolver: zodResolver(
      SignalementCreateSchema
    ) as unknown as Resolver<SignalementCreateDTO>,
    defaultValues: {
      titre: "",
      description: "",
      categorieId: "",
      adresse: "",
      latitude: 0,
      longitude: 0,
      statut: "NOUVEAU",
    },
  });

  useEffect(() => {
    if (signalement) {
      reset({
        titre: signalement.titre ?? "",
        description: signalement.description ?? "",
        categorieId: signalement.categorieId ?? "",
        adresse: signalement.adresse ?? "",
        latitude: signalement.latitude ?? 0,
        longitude: signalement.longitude ?? 0,
        statut: signalement.statut ?? "NOUVEAU",
      });
    }
  }, [signalement, reset]);

  const { mutateAsync: ajouter, isPending: isAdding } =
    useAjouterSignalementMutation();
  const { mutateAsync: modifier, isPending: isUpdating } =
    useModifierSignalementMutation();

  const isLoading = isAdding || isUpdating;

  const onSubmit = async (data: SignalementCreateDTO) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    const redirect = () => router.push("/dashboard/signalements");
    if (isEdit && signalement?.id) {
      await modifier({ id: signalement.id, data: formData }, { onSuccess: redirect });
    } else {
      await ajouter({ data: formData }, { onSuccess: redirect });
    }
  };

  return (
    <Card className="mt-6">
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Titre"
            placeholder="Titre du signalement"
            variant="bordered"
            {...register("titre")}
            isInvalid={Boolean(errors.titre)}
            errorMessage={errors.titre?.message}
          />

          <Textarea
            label="Description"
            placeholder="Décrivez le signalement"
            variant="bordered"
            {...register("description")}
            isInvalid={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Controller
                control={control}
                name="categorieId"
                render={({ field }) => (
                  <Select
                    label="Catégorie"
                    placeholder="Choisir une catégorie"
                    variant="bordered"
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) =>
                      field.onChange((Array.from(keys)[0] as string) ?? "")
                    }
                    isInvalid={Boolean(errors.categorieId)}
                    errorMessage={errors.categorieId?.message}
                  >
                    {(categories ?? []).map((categorie) => (
                      <SelectItem key={categorie.id}>{categorie.nom}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                control={control}
                name="statut"
                render={({ field }) => (
                  <Select
                    label="Statut"
                    placeholder="Choisir un statut"
                    variant="bordered"
                    selectedKeys={field.value ? [field.value] : []}
                    onSelectionChange={(keys) =>
                      field.onChange(
                        (Array.from(keys)[0] as SignalementCreateDTO["statut"]) ??
                          "NOUVEAU"
                      )
                    }
                    isInvalid={Boolean(errors.statut)}
                    errorMessage={errors.statut?.message}
                  >
                    {STATUTS.map((statut) => (
                      <SelectItem key={statut}>{statut}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>
          </div>

          <Input
            label="Adresse"
            placeholder="Adresse du signalement"
            variant="bordered"
            {...register("adresse")}
            isInvalid={Boolean(errors.adresse)}
            errorMessage={errors.adresse?.message}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                label="Latitude"
                type="number"
                step="any"
                variant="bordered"
                {...register("latitude", { valueAsNumber: true })}
                isInvalid={Boolean(errors.latitude)}
                errorMessage={errors.latitude?.message}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Longitude"
                type="number"
                step="any"
                variant="bordered"
                {...register("longitude", { valueAsNumber: true })}
                isInvalid={Boolean(errors.longitude)}
                errorMessage={errors.longitude?.message}
              />
            </div>
          </div>

          <Input
            label="Photo"
            type="file"
            accept="image/*"
            variant="bordered"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("photo", file, { shouldValidate: true });
            }}
            isInvalid={Boolean(errors.photo)}
            errorMessage={errors.photo?.message as string | undefined}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="light"
              type="button"
              onPress={() => router.push("/dashboard/signalements")}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button color="primary" type="submit" isLoading={isLoading}>
              {isEdit ? "Enregistrer" : "Créer"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
