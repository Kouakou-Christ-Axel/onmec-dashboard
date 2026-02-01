"use client";
import React from 'react';
import Content from "@/components/primitives/Content";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import {Card, CardBody} from "@heroui/react";

function AjouterDocumentPage() {
	return (
		<Content>
			<Title>Ajouter un document</Title>
			<Subtitle>Ajoutez un nouveau document à la librairie.</Subtitle>
			<Card className="mt-6">
				<CardBody>
					{/* Formulaire d'ajout de document */}
					<p>Formulaire d'ajout de document à implémenter ici.</p>
				</CardBody>
			</Card>
		</Content>
	);
}

export default AjouterDocumentPage;