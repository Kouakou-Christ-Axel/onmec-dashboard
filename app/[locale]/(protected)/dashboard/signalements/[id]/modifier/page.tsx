import React from "react";
import { notFound } from "next/navigation";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import SignalementForm from "@/components/(protected)/dashboard/signalements-citoyen/signalement-form";
import { obtenirUnSignalementAction } from "@/features/signalements";

export default async function ModifierSignalementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await obtenirUnSignalementAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <Content>
      <Title>Modifier le signalement</Title>
      <Subtitle>Mettez à jour les informations du signalement.</Subtitle>
      <SignalementForm signalement={result.data} />
    </Content>
  );
}
