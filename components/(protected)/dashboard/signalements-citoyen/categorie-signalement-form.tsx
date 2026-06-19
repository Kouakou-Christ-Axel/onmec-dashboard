"use client";

import React, { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Input, Switch, Textarea } from "@heroui/react";
import { useRouter } from "@/i18n/navigation";
import {
  CategorieSignalementCreateDTO,
  CategorieSignalementCreateSchema,
} from "@/features/signalements/schema/signalement.schema";
import { ICategorieSignalement } from "@/features/signalements/types/categorie-signalement.types";
import { useAjouterCategorieMutation } from "@/features/signalements/queries/categorie/categorie-add.mutation";
import { useModifierCategorieMutation } from "@/features/signalements/queries/categorie/categorie-update.mutation";

type Props = {
  categorie?: ICategorieSignalement | null;
};

export default function CategorieSignalementForm({ categorie }: Props) {
  const router = useRouter();
  const isEdit = Boolean(categorie?.id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategorieSignalementCreateDTO>({
    resolver: zodResolver(
      CategorieSignalementCreateSchema
    ) as unknown as Resolver<CategorieSignalementCreateDTO>,
    defaultValues: {
      nom: "",
      description: "",
      validationObligatoire: false,
    },
  });

  useEffect(() => {
    reset({
      nom: categorie?.nom ?? "",
      description: categorie?.description ?? "",
      validationObligatoire: categorie?.validationObligatoire ?? false,
    });
  }, [categorie, reset]);

  const { mutateAsync: ajouter, isPending: isAdding } =
    useAjouterCategorieMutation();
  const { mutateAsync: modifier, isPending: isUpdating } =
    useModifierCategorieMutation();

  const isLoading = isAdding || isUpdating;

  const onSubmit = async (data: CategorieSignalementCreateDTO) => {
    const redirect = () => router.push("/dashboard/signalements");
    if (isEdit && categorie?.id) {
      await modifier({ id: categorie.id, data }, { onSuccess: redirect });
    } else {
      await ajouter({ data }, { onSuccess: redirect });
    }
  };

  return (
    <Card className="mt-6">
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nom"
            placeholder="Nom de la catégorie"
            variant="bordered"
            {...register("nom")}
            isInvalid={Boolean(errors.nom)}
            errorMessage={errors.nom?.message}
          />
          <Textarea
            label="Description"
            placeholder="Description (optionnelle)"
            variant="bordered"
            {...register("description")}
            isInvalid={Boolean(errors.description)}
            errorMessage={errors.description?.message}
          />
          <Switch
            isSelected={Boolean(watch("validationObligatoire"))}
            onValueChange={(value) =>
              setValue("validationObligatoire", value, { shouldValidate: true })
            }
          >
            Validation obligatoire
          </Switch>

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
