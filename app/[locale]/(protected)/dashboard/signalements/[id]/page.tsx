"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter, Link } from "@/i18n/navigation";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import ConfirmDialog from "@/components/common/confirm-dialog";
import { formatDateTime } from "@/utils/date.utils";
import { ISignalement } from "@/features/signalements";
import { useSignalementQuery } from "@/features/signalements/queries/signalement/signalement-detail.query";
import { useSupprimerSignalementMutation } from "@/features/signalements/queries/signalement/signalement-delete.mutation";
import {
  useChangerStatutSignalementMutation,
  useValiderSignalementMutation,
} from "@/features/signalements/queries/signalement/signalement-statut.mutation";

const statutConfig: Record<
  ISignalement["statut"],
  { label: string; color: "primary" | "warning" | "success" | "danger" }
> = {
  NOUVEAU: { label: "Nouveau", color: "primary" },
  EN_COURS: { label: "En cours", color: "warning" },
  RESOLU: { label: "Résolu", color: "success" },
  REJETE: { label: "Rejeté", color: "danger" },
};

const STATUTS: ISignalement["statut"][] = [
  "NOUVEAU",
  "EN_COURS",
  "RESOLU",
  "REJETE",
];

export default function SignalementDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) ?? "";

  const { data: signalement, isLoading, isError } = useSignalementQuery(id);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutateAsync: supprimer, isPending: isDeleting } =
    useSupprimerSignalementMutation();
  const { mutate: changerStatut, isPending: isChangingStatut } =
    useChangerStatutSignalementMutation();
  const { mutate: valider, isPending: isValidating } =
    useValiderSignalementMutation();

  if (isLoading) {
    return (
      <Content>
        <div className="flex items-center justify-center py-20">
          <Spinner label="Chargement du signalement..." />
        </div>
      </Content>
    );
  }

  if (isError || !signalement) {
    return (
      <Content>
        <div className="py-20 text-center text-danger-500">
          Impossible de charger le signalement.
        </div>
      </Content>
    );
  }

  const statut = statutConfig[signalement.statut];

  const confirmDelete = async () => {
    await supprimer(
      { id: signalement.id },
      {
        onSuccess: () => {
          setConfirmOpen(false);
          router.push("/dashboard/signalements");
        },
      }
    );
  };

  return (
    <Content>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button isIconOnly variant="light" onPress={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <Title>{signalement.titre}</Title>
            <Subtitle>Détails du signalement</Subtitle>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            as={Link}
            href={`/dashboard/signalements/${signalement.id}/modifier`}
            color="primary"
            variant="flat"
            startContent={<Pencil className="w-4 h-4" />}
          >
            Modifier
          </Button>
          <Button
            color="danger"
            variant="flat"
            startContent={<Trash2 className="w-4 h-4" />}
            onPress={() => setConfirmOpen(true)}
          >
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Chip color={statut.color} variant="flat">
                {statut.label}
              </Chip>
              <Chip
                variant="flat"
                color={signalement.validation ? "success" : "default"}
                startContent={
                  signalement.validation ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )
                }
              >
                {signalement.validation ? "Validé" : "En attente"}
              </Chip>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            {signalement.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signalement.photo}
                alt={signalement.titre}
                className="w-full max-h-80 object-cover rounded-md border"
              />
            )}

            <div>
              <p className="text-sm font-medium text-default-500">Description</p>
              <p className="text-sm whitespace-pre-line">
                {signalement.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-default-500">Catégorie</p>
                <p className="text-sm">{signalement.categorie?.nom ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-default-500">
                  Signalé par
                </p>
                <p className="text-sm">
                  {signalement.citoyen?.fullname ?? "Utilisateur supprimé"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-default-500">
                  Localisation
                </p>
                <p className="text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-default-500" />
                  {signalement.adresse}
                  <span className="text-default-400">
                    ({signalement.latitude}, {signalement.longitude})
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-default-500">
                  Date de création
                </p>
                <p className="text-sm">
                  {formatDateTime(signalement.createdAt)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Panneau d'actions */}
        <Card className="h-fit">
          <CardHeader>
            <h3 className="text-base font-semibold">Gestion</h3>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <Select
              label="Statut"
              variant="bordered"
              isDisabled={isChangingStatut}
              selectedKeys={[signalement.statut]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as ISignalement["statut"];
                if (value && value !== signalement.statut) {
                  changerStatut({ id: signalement.id, statut: value });
                }
              }}
            >
              {STATUTS.map((s) => (
                <SelectItem key={s}>{statutConfig[s].label}</SelectItem>
              ))}
            </Select>

            {signalement.validation ? (
              <Button
                variant="flat"
                isLoading={isValidating}
                onPress={() =>
                  valider({ id: signalement.id, validation: false })
                }
              >
                Invalider le signalement
              </Button>
            ) : (
              <Button
                color="success"
                variant="flat"
                isLoading={isValidating}
                startContent={<CheckCircle2 className="w-4 h-4" />}
                onPress={() =>
                  valider({ id: signalement.id, validation: true })
                }
              >
                Valider le signalement
              </Button>
            )}
          </CardBody>
        </Card>
      </div>

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
    </Content>
  );
}
