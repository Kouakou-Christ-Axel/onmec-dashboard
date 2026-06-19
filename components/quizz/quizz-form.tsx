"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizzSchema, QuizzCreateDTO } from "@/features/quizz/schema/quizz.schema";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/react";
import QuestionItem from "@/components/quizz/question-item";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAjouterQuizzMutation } from "@/features/quizz/queries/quizz-add.mutation";
import { useModifierQuizzMutation } from "@/features/quizz/queries/quizz-update.mutation";
import { useCategoriesQuizzQuery } from "@/features/quizz/queries/categories-list.query";
import { QUIZ_DIFFICULTES } from "@/features/quizz/types/quizz.type";
import { useRouter } from "@/i18n/navigation";

const emptyQuizz: QuizzCreateDTO = {
    title: "",
    description: "",
    authorId: "1",
    categorieId: "",
    difficulte: undefined,
    questions: [
        {
            text: "",
            choices: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        },
    ],
};

type Props = {
    quizId?: string;
    initialData?: QuizzCreateDTO;
};

export default function QuizzForm({ quizId, initialData }: Props) {
    const router = useRouter();
    const isEdit = Boolean(quizId);

    const form = useForm<QuizzCreateDTO>({
        resolver: zodResolver(QuizzSchema),
        defaultValues: initialData ?? emptyQuizz,
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: "questions",
    });

    const { mutateAsync: ajouterQuizz, isPending: isAdding } = useAjouterQuizzMutation();
    const { mutateAsync: modifierQuizz, isPending: isUpdating } = useModifierQuizzMutation();

    const { data: categories } = useCategoriesQuizzQuery();

    const isLoading = isAdding || isUpdating || form.formState.isSubmitting;

    const onSubmit = async (data: QuizzCreateDTO) => {
        if (isEdit && quizId) {
            await modifierQuizz(
                { id: quizId, data },
                { onSuccess: () => router.push("/dashboard/quizz") }
            );
        } else {
            await ajouterQuizz(
                { data },
                { onSuccess: () => router.push("/dashboard/quizz") }
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* TITLE */}
            <div>
                <Input {...register("title")} placeholder="Titre du quizz" />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
            </div>

            {/* DESCRIPTION */}
            <div>
                <Textarea {...register("description")} placeholder="Description" />
            </div>

            {/* CATEGORIE & DIFFICULTE */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Controller
                        control={control}
                        name="categorieId"
                        render={({ field }) => (
                            <Select
                                label="Catégorie"
                                placeholder="Choisir une catégorie"
                                variant="bordered"
                                selectedKeys={field.value ? [field.value] : []}
                                onSelectionChange={(keys) =>
                                    field.onChange((Array.from(keys)[0] as string) ?? "")
                                }
                            >
                                {(categories ?? []).map((categorie) => (
                                    <SelectItem key={categorie.id}>{categorie.nom}</SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>

                <div className="flex-1">
                    <Controller
                        control={control}
                        name="difficulte"
                        render={({ field }) => (
                            <Select
                                label="Difficulté"
                                placeholder="Choisir une difficulté"
                                variant="bordered"
                                selectedKeys={field.value ? [field.value] : []}
                                onSelectionChange={(keys) =>
                                    field.onChange((Array.from(keys)[0] as string) || undefined)
                                }
                            >
                                {QUIZ_DIFFICULTES.map((difficulte) => (
                                    <SelectItem key={difficulte}>{difficulte}</SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            {/* QUESTIONS */}
            <div className="space-y-6">
                {questionFields.map((question, qIndex) => (
                    <QuestionItem
                        key={question.id}
                        qIndex={qIndex}
                        control={control}
                        register={register}
                        errors={errors}
                        removeQuestion={removeQuestion}
                    />
                ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    type="button"
                    className="bg-blue-600 text-white"
                    onClick={() =>
                        appendQuestion({
                            text: "",
                            choices: [
                                { text: "", isCorrect: false },
                                { text: "", isCorrect: false },
                            ],
                        })
                    }
                >
                    Ajouter une question
                </Button>

                <Button
                    className="bg-green-600 text-white"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Enregistrement..."
                        : isEdit
                            ? "Enregistrer les modifications"
                            : "Créer le quizz"}
                </Button>
            </div>
        </form>
    );
}
