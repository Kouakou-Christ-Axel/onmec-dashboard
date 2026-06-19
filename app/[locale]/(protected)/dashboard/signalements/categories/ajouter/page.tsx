import React from "react";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import CategorieSignalementForm from "@/components/(protected)/dashboard/signalements-citoyen/categorie-signalement-form";

export default function AjouterCategorieSignalementPage() {
  return (
    <Content>
      <Title>Ajouter une catégorie</Title>
      <Subtitle>Créez une nouvelle catégorie de signalement.</Subtitle>
      <CategorieSignalementForm />
    </Content>
  );
}
