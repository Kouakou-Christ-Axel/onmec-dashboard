"use client";
import Content from "@/components/primitives/Content";
import React from 'react';
import ActualitesFiltersBar from "@/components/(protected)/dashboard/actualites/actualites-filters-bar";
import DocumentsListSection from "@/components/(protected)/dashboard/librairie/documents-list-section";
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import {Button} from "@heroui/react";
import {Plus} from "lucide-react";
import {Link} from "@/i18n/navigation";

function LibrairiePage() {
	return (
		<Content>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<Title>Documents</Title>
					<Subtitle>
						Gérez les les documents
					</Subtitle>
				</div>
				<Button
					color="primary"
					startContent={<Plus className="w-4 h-4"/>}
					className="mt-4 sm:mt-0"
					as={Link}
					href="/dashboard/actualites/ajouter"
				>
					Ajouter un document
				</Button>
			</div>
			<DocumentsListSection/>
		</Content>
	);
}

export default LibrairiePage;