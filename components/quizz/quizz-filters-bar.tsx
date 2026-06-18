"use client";

import Subtitle from "@/components/primitives/Subtitle";
import Title from "@/components/primitives/Title";
import useQuizzFilters from "@/features/quizz/hooks/use-quizz-filters";
import { useCategoriesQuizzQuery } from "@/features/quizz/queries/categories-list.query";
import { QUIZ_DIFFICULTES } from "@/features/quizz/types/quizz.type";
import { Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react";
import { Plus, Search, Tags, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

function QuizzFiltersBar() {
	const {
		filters,
		handleTextFilterChange,
		handleCategorieChange,
		handleDifficulteChange,
		handleClearAllFilters,
	} = useQuizzFilters();

	const { data: categories } = useCategoriesQuizzQuery();

	const activeFiltersCount = [filters.search, filters.categorieId, filters.difficulte].filter(
		(value) => value && value !== ""
	).length;

	return (
		<div className="w-full mb-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
				<div>
					<Title>Quiz</Title>
					<Subtitle>Gérez les quiz de sensibilisation citoyenne</Subtitle>
				</div>
				<div className="flex gap-2 mt-4 sm:mt-0">
					<Button
						variant="bordered"
						startContent={<Tags className="w-4 h-4" />}
						as={Link}
						href="/dashboard/quizz/categories"
					>
						Gérer les catégories
					</Button>
					<Button
						color="primary"
						startContent={<Plus className="w-4 h-4" />}
						as={Link}
						href="/dashboard/quizz/ajouter"
					>
						Créer un quiz
					</Button>
				</div>
			</div>

			{/* Filtres */}
			<Card className="shadow-sm border-0 bg-content1">
				<CardBody className="p-6">
					<div className="flex flex-col lg:flex-row gap-4">
						{/* Recherche */}
						<div className="flex-1">
							<Input
								placeholder="Rechercher un quiz..."
								value={filters.search}
								onChange={(e) => handleTextFilterChange("search", e.target.value)}
								startContent={<Search className="w-4 h-4" />}
								variant="bordered"
								isClearable
								onClear={() => handleTextFilterChange("search", "")}
							/>
						</div>

						{/* Catégorie */}
						<div className="flex-1">
							<Select
								label="Catégorie"
								placeholder="Toutes les catégories"
								selectedKeys={filters.categorieId ? [filters.categorieId] : []}
								onSelectionChange={(keys) =>
									handleCategorieChange((Array.from(keys)[0] as string) ?? "")
								}
								variant="bordered"
							>
								{(categories ?? []).map((categorie) => (
									<SelectItem key={categorie.id}>{categorie.nom}</SelectItem>
								))}
							</Select>
						</div>

						{/* Difficulté */}
						<div className="flex-1">
							<Select
								label="Difficulté"
								placeholder="Toutes les difficultés"
								selectedKeys={filters.difficulte ? [filters.difficulte] : []}
								onSelectionChange={(keys) =>
									handleDifficulteChange((Array.from(keys)[0] as string) ?? "")
								}
								variant="bordered"
							>
								{QUIZ_DIFFICULTES.map((difficulte) => (
									<SelectItem key={difficulte}>{difficulte}</SelectItem>
								))}
							</Select>
						</div>

						{/* Réinitialiser */}
						{activeFiltersCount > 0 && (
							<div className="flex items-end">
								<Button
									variant="light"
									color="danger"
									startContent={<X className="w-4 h-4" />}
									onPress={handleClearAllFilters}
								>
									Effacer
								</Button>
							</div>
						)}
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

export default QuizzFiltersBar;
