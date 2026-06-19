import React from "react";
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import SignalementForm from "@/components/(protected)/dashboard/signalements-citoyen/signalement-form";

export default function AjouterSignalementPage() {
  return (
    <Content>
      <Title>Ajouter un signalement</Title>
      <Subtitle>Créez un nouveau signalement citoyen.</Subtitle>
      <SignalementForm />
    </Content>
  );
}
