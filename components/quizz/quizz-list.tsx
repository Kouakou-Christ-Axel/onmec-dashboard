"use client";

import React from "react";
import { Card, CardBody, Chip, Pagination, Spinner } from "@heroui/react";
import useQuizzFilters from "@/features/quizz/hooks/use-quizz-filters";
import { useQuizzListQuery } from "@/features/quizz/queries/quizz-list.query";
import { IQuizz, QuizDifficulte } from "@/features/quizz/types/quizz.type";

const difficulteColor: Record<QuizDifficulte, "success" | "warning" | "danger"> = {
	FACILE: "success",
	MOYEN: "warning",
	DIFFICILE: "danger",
};

function QuizzList() {
	const { currentSearchParams, handlePageChange } = useQuizzFilters();
	const { data, isLoading, isError, error } = useQuizzListQuery(currentSearchParams);

	const quizzes: IQuizz[] = data?.data ?? [];
	const meta = data?.meta;

	if (isLoading) {
		return (
			<div className="flex justify-center py-20">
				<Spinner label="Chargement des quiz..." />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center py-20 text-danger">
				<p>Erreur lors du chargement des quiz</p>
				{error instanceof Error && <p className="text-sm">{error.message}</p>}
			</div>
		);
	}

	if (quizzes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center text-default-400">
				<p className="text-lg font-medium">Aucun quiz trouvé</p>
				<p className="text-sm mt-1">
					Ajustez vos filtres ou créez votre premier quiz.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{quizzes.map((quiz) => (
					<Card key={quiz.id} className="border border-default-200">
						<CardBody className="space-y-3">
							<div className="flex items-start justify-between gap-2">
								<h3 className="font-semibold text-base line-clamp-2">{quiz.title}</h3>
							</div>

							{quiz.description && (
								<p className="text-sm text-default-500 line-clamp-2">
									{quiz.description}
								</p>
							)}

							<div className="flex flex-wrap gap-2 pt-1">
								{quiz.categorie?.nom && (
									<Chip size="sm" variant="flat" color="primary">
										{quiz.categorie.nom}
									</Chip>
								)}
								{quiz.difficulte && (
									<Chip
										size="sm"
										variant="flat"
										color={difficulteColor[quiz.difficulte]}
									>
										{quiz.difficulte}
									</Chip>
								)}
								{quiz.questions?.length != null && (
									<Chip size="sm" variant="flat">
										{quiz.questions.length} question(s)
									</Chip>
								)}
							</div>
						</CardBody>
					</Card>
				))}
			</div>

			{(meta?.totalPages || 1) > 1 && (
				<div className="flex justify-center pt-4">
					<Pagination
						isCompact
						showControls
						page={meta?.page || 1}
						total={meta?.totalPages || 1}
						onChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default QuizzList;
