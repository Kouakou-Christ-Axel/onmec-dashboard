'use client';

import Content from "@/components/primitives/Content";
import React, { useState } from 'react';
import Title from "@/components/primitives/Title";
import Subtitle from "@/components/primitives/Subtitle";
import { Button, Tabs, Tab } from "@heroui/react";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SignalementsListSection from "@/components/(protected)/dashboard/signalements-citoyen/signalements-list-section";
import CategoriesListSection from "@/components/(protected)/dashboard/signalements-citoyen/categories-list-section";

function SignalementsPage() {
	const [activeTab, setActiveTab] = useState("signalements");

	return (
		<Content className="overflow-hidden">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<Title>Signalements</Title>
					<Subtitle>
						Gérez les signalements citoyens et leurs catégories
					</Subtitle>
				</div>
				{activeTab === "signalements" && (
					<Button
						color="primary"
						startContent={<Plus className="w-4 h-4" />}
						className="mt-4 sm:mt-0"
						as={Link}
						href="/dashboard/signalements/ajouter"
					>
						Ajouter un signalement
					</Button>
				)}
				{activeTab === "categories" && (
					<Button
						color="primary"
						startContent={<Plus className="w-4 h-4" />}
						className="mt-4 sm:mt-0"
						as={Link}
						href="/dashboard/signalements/categories/ajouter"
					>
						Ajouter une catégorie
					</Button>
				)}
			</div>

			<Tabs
				aria-label="Signalements options"
				selectedKey={activeTab}
				onSelectionChange={(key) => setActiveTab(key as string)}
				className="mb-6"
			>
				<Tab key="signalements" title="Signalements">
					<SignalementsListSection />
				</Tab>
				<Tab key="categories" title="Catégories">
					<CategoriesListSection />
				</Tab>
			</Tabs>
		</Content>
	);
}

export default SignalementsPage;

