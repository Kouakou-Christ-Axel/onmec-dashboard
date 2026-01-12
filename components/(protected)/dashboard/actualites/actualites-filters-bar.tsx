"use client";
import Subtitle from "@/components/primitives/Subtitle";
import Title from "@/components/primitives/Title";
import useActualitesFilters from "@/features/actualites/hooks/use-actualites-filters";
import {Button, Card, CardBody, Chip, Input, Select, SelectItem,} from "@heroui/react";
import {Plus, Search, X} from "lucide-react";
import {Link} from "@/i18n/navigation";

function ActualitesFiltersBar() {
	const {
		filters,
		handleTextFilterChange,
		handleDateFilterChange,
		handleImageFilterChange,
		handleClearAllFilters,
	} = useActualitesFilters()

	// Compter les filtres actifs
	const activeFiltersCount = Object.values(filters).filter(
		(value) => value && value !== ""
	).length;

	return (
		<div className="w-full mb-6">
			{/* Header avec titre et bouton d'ajout */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<Title>Actualités</Title>
					<Subtitle>
						Gérez les actualités de votre plateforme
					</Subtitle>
				</div>
				<Button
					color="primary"
					startContent={<Plus className="w-4 h-4"/>}
					className="mt-4 sm:mt-0"
					as={Link}
					href="/dashboard/actualites/ajouter"
				>
					Ajouter une actualité
				</Button>
			</div>

			{/* Card contenant les filtres */}
			<Card className="shadow-sm border-0 bg-content1">
				<CardBody className="p-6">
					<div className="flex flex-col space-y-6">
						{/* Barre de recherche principale */}
						<div className="relative">
							<Input
								placeholder="Rechercher par titre, extrait ou contenu..."
								value={filters.search}
								onChange={(e) =>
									handleTextFilterChange("search", e.target.value)
								}
								startContent={<Search className="w-4 h-4"/>}
								variant="bordered"
							/>
						</div>

						{/* Filtres avancés */}
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Filtre date début */}
							<div className="flex-1">
								<Input
									label="Date depuis"
									type="date"
									value={filters.dateFrom}
									onChange={(e) =>
										handleDateFilterChange("dateFrom", e.target.value)
									}
									variant="bordered"
								/>
							</div>

							{/* Filtre date fin */}
							<div className="flex-1">
								<Input
									label="Date jusqu'au"
									type="date"
									value={filters.dateTo}
									onChange={(e) =>
										handleDateFilterChange("dateTo", e.target.value)
									}
									variant="bordered"
								/>
							</div>

							{/* Filtre image */}
							<div className="flex-1">
								<Select
									label="Image"
									placeholder="Toutes les actualités"
									selectedKeys={filters.hasImage !== undefined && filters.hasImage !== null ? [String(filters.hasImage)] : []}
									onSelectionChange={(keys) => {
										const value = Array.from(keys)[0] as string;
										if (value === "true") {
											handleImageFilterChange(true);
										} else if (value === "false") {
											handleImageFilterChange(false);
										} else {
											handleImageFilterChange(undefined);
										}
									}}
									variant="bordered"
								>
									<SelectItem key="true">
										Avec image
									</SelectItem>
									<SelectItem key="false">
										Sans image
									</SelectItem>
								</Select>
							</div>
						</div>

						{/* Filtres actifs et actions */}
						{activeFiltersCount > 0 && (
							<div className="flex flex-wrap items-center justify-between gap-4 pt-4">
								<div className="flex flex-wrap items-center gap-2">
									<span className="text-sm font-medium text-gray-400">
										Filtres actifs:
									</span>

									{filters.search && (
										<Chip
											size="sm"
											variant="flat"
											color="primary"
											onClose={() => handleTextFilterChange("search", "")}
										>
											Recherche: {filters.search}
										</Chip>
									)}

									{filters.dateFrom && (
										<Chip
											size="sm"
											variant="flat"
											color="primary"
											onClose={() => handleDateFilterChange("dateFrom", "")}
										>
											Depuis: {new Date(filters.dateFrom).toLocaleDateString()}
										</Chip>
									)}

									{filters.dateTo && (
										<Chip
											size="sm"
											variant="flat"
											color="primary"
											onClose={() => handleDateFilterChange("dateTo", "")}
										>
											Jusqu'au: {new Date(filters.dateTo).toLocaleDateString()}
										</Chip>
									)}

									{filters.hasImage !== undefined && filters.hasImage !== null && (
										<Chip
											size="sm"
											variant="flat"
											color="primary"
											onClose={() => handleImageFilterChange(undefined)}
										>
											{filters.hasImage ? "Avec image" : "Sans image"}
										</Chip>
									)}
								</div>

								<Button
									size="sm"
									variant="light"
									color="danger"
									startContent={<X className="w-3 h-3"/>}
									onPress={handleClearAllFilters}
								>
									Effacer tout
								</Button>
							</div>
						)}
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

export default ActualitesFiltersBar;