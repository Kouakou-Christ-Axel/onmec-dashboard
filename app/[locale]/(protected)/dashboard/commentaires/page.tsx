"use client";
import Content from "@/components/primitives/Content";
import React from "react";
import CommentairesListSection from "@/components/(protected)/dashboard/commentaires/commentaires-list-section";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";

function CommentairesPage() {
  return (
    <Content>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <Title>Commentaires</Title>
          <Subtitle>
            Modérez les commentaires des citoyens sur les signalements et les
            actualités
          </Subtitle>
        </div>
      </div>
      <CommentairesListSection />
    </Content>
  );
}

export default CommentairesPage;
