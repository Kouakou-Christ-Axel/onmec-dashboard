"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizzSchema, QuizzCreateDTO } from "@/features/quizz/schema/quizz.schema";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Select,
    SelectItem,
} from "@heroui/react";
import { ListChecks, Plus } from "lucide-react";
import QuestionItem from "@/components/quizz/question-item";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAjouterQuizzMutation } from "@/features/quizz/queries/quizz-add.mutation";
import { useModifierQuizzMutation } from "@/features/quizz/queries/quizz-update.mutation";
import { useCategoriesQuizzQuery } from "@/features/quizz/queries/categories-list.query";
import { QUIZ_DIFFICULTES } from "@/features/quizz/types/quizz.type";
import { useRouter } from "@/i18n/navigation";

const createEmptyQuestion = () => ({
    text: "",
    choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ],
});

const emptyQuizz: QuizzCreateDTO = {
    title: "",
    description: "",
    authorId: "1",
    categorieId: "",
    difficulte: undefined,
    questions: [createEmptyQuestion()],
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
            {/* En-tête */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">
                    {isEdit ? "Modifier le quiz" : "Créer un quiz"}
                </h1>
                <p className="text-sm text-default-500">
                    Renseignez les informations générales puis ajoutez vos questions et leurs
                    réponses. Cochez la (ou les) bonne(s) réponse(s) pour chaque question.
                </p>
            </div>

            {/* Informations générales */}
            <Card className="border border-default-200">
                <CardHeader>
                    <h2 className="text-base font-semibold">Informations générales</h2>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-4">
                    {/* TITLE */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">
                            Titre <span className="text-danger">*</span>
                        </label>
                        <Input {...register("title")} placeholder="Titre du quiz" />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            {...register("description")}
                            placeholder="Décrivez brièvement le quiz (optionnel)"
                        />
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
                </CardBody>
            </Card>

            {/* Questions */}
            <Card className="border border-default-200">
                <CardHeader className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <ListChecks className="size-5 text-primary" />
                        <h2 className="text-base font-semibold">Questions</h2>
                        <Chip size="sm" variant="flat" color="primary">
                            {questionFields.length}
                        </Chip>
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        color="primary"
                        variant="flat"
                        startContent={<Plus className="size-4" />}
                        onPress={() => appendQuestion(createEmptyQuestion())}
                    >
                        Ajouter une question
                    </Button>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-6">
                    {questionFields.length === 0 ? (
                        <div className="text-center text-default-400 py-8">
                            <p className="text-sm">
                                Aucune question pour le moment. Cliquez sur « Ajouter une
                                question » pour commencer.
                            </p>
                        </div>
                    ) : (
                        questionFields.map((question, qIndex) => (
                            <QuestionItem
                                key={question.id}
                                qIndex={qIndex}
                                control={control}
                                register={register}
                                errors={errors}
                                removeQuestion={removeQuestion}
                                canRemove={questionFields.length > 1}
                            />
                        ))
                    )}

                    {typeof errors.questions?.message === "string" && (
                        <p className="text-red-500 text-sm">{errors.questions.message}</p>
                    )}
                </CardBody>
            </Card>

            {/* Barre d'actions */}
            <div className="sticky bottom-0 z-10 -mx-2 flex justify-end gap-3 border-t border-default-200 bg-background/80 px-2 py-4 backdrop-blur">
                <Button
                    type="button"
                    variant="flat"
                    onPress={() => router.push("/dashboard/quizz")}
                    disabled={isLoading}
                >
                    Annuler
                </Button>
                <Button
                    className="bg-green-600 text-white"
                    type="submit"
                    isLoading={isLoading}
                >
                    {isEdit ? "Enregistrer les modifications" : "Créer le quiz"}
                </Button>
            </div>
        </form>
    );
}
