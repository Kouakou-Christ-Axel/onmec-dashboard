import React from "react";
import { notFound } from "next/navigation";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import CategorieSignalementForm from "@/components/(protected)/dashboard/signalements-citoyen/categorie-signalement-form";
import { obtenirUneCategorieAction } from "@/features/signalements";

export default async function ModifierCategorieSignalementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await obtenirUneCategorieAction(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <Content>
      <Title>Modifier la catégorie</Title>
      <Subtitle>Mettez à jour les informations de la catégorie.</Subtitle>
      <CategorieSignalementForm categorie={result.data} />
    </Content>
  );
}
