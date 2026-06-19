"use client";

import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import QuizzForm from "@/components/quizz/quizz-form";
import { useQuizzDetailQuery } from "@/features/quizz/queries/quizz-detail.query";
import { QuizzCreateDTO } from "@/features/quizz/schema/quizz.schema";

export default function ModifierQuizz() {
    const params = useParams<{ id: string }>();
    const id = params?.id as string;

    const { data: quiz, isLoading, isError } = useQuizzDetailQuery(id);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner label="Chargement du quiz..." />
            </div>
        );
    }

    if (isError || !quiz) {
        return (
            <div className="text-center py-20 text-danger">
                <p>Quiz introuvable</p>
            </div>
        );
    }

    const initialData: QuizzCreateDTO = {
        title: quiz.title,
        description: quiz.description ?? "",
        authorId: quiz.authorId ?? "1",
        categorieId: quiz.categorieId ?? "",
        difficulte: quiz.difficulte,
        questions: (quiz.questions ?? []).map((question) => ({
            text: question.text,
            choices: (question.choices ?? []).map((choice) => ({
                text: choice.text,
                isCorrect: Boolean(choice.id && choice.id === question.correctId),
            })),
        })),
    };

    return <QuizzForm quizId={id} initialData={initialData} />;
}
