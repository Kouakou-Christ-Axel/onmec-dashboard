"use client";

import { useFieldArray, Control, UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import { QuizzCreateDTO } from "@/features/quizz/schema/quizz.schema";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/react";
import { Plus, Trash, X } from "lucide-react";


type Props = {
    qIndex: number;
    control: Control<QuizzCreateDTO>;
    register: UseFormRegister<QuizzCreateDTO>;
    errors: FieldErrors<QuizzCreateDTO>;
    removeQuestion: (index: number) => void;
    canRemove?: boolean;
};

export default function QuestionItem({
    qIndex,
    control,
    register,
    errors,
    removeQuestion,
    canRemove = true,
}: Props) {

    const questionChoicesErrors = errors.questions?.[qIndex]?.choices as
        | {
            message?: string;
            root?: { message?: string };
            [index: number]: { isCorrect?: { message?: string } };
        }
        | undefined;

    const choicesErrorMessage =
        questionChoicesErrors?.message ??
        questionChoicesErrors?.root?.message ??
        questionChoicesErrors?.[0]?.isCorrect?.message;

    // ⚠️ ICI uniquement : field array des CHOICES
    const {
        fields: choiceFields,
        append: appendChoice,
        remove: removeChoice,
    } = useFieldArray({
        control,
        name: `questions.${qIndex}.choices`,
    });

    // Le schéma impose au moins 2 choix : on empêche de descendre en dessous.
    const canRemoveChoice = choiceFields.length > 2;

    return (
        <div className="rounded-xl border border-default-200 bg-default-50/40 p-4 space-y-4">

            {/* En-tête de la question */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        {qIndex + 1}
                    </span>
                    <span className="text-sm font-medium text-default-600">Question</span>
                </div>

                <Button
                    type="button"
                    color="danger"
                    variant="light"
                    size="sm"
                    isDisabled={!canRemove}
                    startContent={<Trash className="size-4" />}
                    onPress={() => removeQuestion(qIndex)}
                >
                    Supprimer
                </Button>
            </div>

            {/* Texte question */}
            <div className="space-y-1">
                <Input
                    {...register(`questions.${qIndex}.text`)}
                    placeholder="Texte de la question"
                    variant="bordered"
                />

                {errors.questions?.[qIndex]?.text && (
                    <p className="text-red-500 text-sm">
                        {errors.questions[qIndex]?.text?.message}
                    </p>
                )}
            </div>

            {/* Choices */}
            <div className="space-y-2">
                <p className="text-xs font-medium text-default-500">
                    Réponses — cochez la (ou les) bonne(s) réponse(s)
                </p>

                {choiceFields.map((choice, cIndex) => {
                    const choiceTextError = (
                        errors.questions?.[qIndex]?.choices as
                            | Array<{ text?: { message?: string } }>
                            | undefined
                    )?.[cIndex]?.text?.message;

                    return (
                    <div key={choice.id} className="flex gap-2 items-start">

                        <div className="pt-2" title="Bonne réponse ?">
                            <Controller
                                control={control}
                                name={`questions.${qIndex}.choices.${cIndex}.isCorrect`}
                                render={({ field }) => (
                                    <Checkbox
                                        isSelected={Boolean(field.value)}
                                        onValueChange={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex-1 space-y-1">
                            <Input
                                {...register(`questions.${qIndex}.choices.${cIndex}.text`)}
                                placeholder={`Choix ${cIndex + 1}`}
                                variant="bordered"
                            />

                            {choiceTextError && (
                                <p className="text-red-500 text-sm">
                                    {choiceTextError}
                                </p>
                            )}
                        </div>

                        <Button
                            type="button"
                            color="danger"
                            variant="light"
                            size="sm"
                            isIconOnly
                            isDisabled={!canRemoveChoice}
                            onPress={() => removeChoice(cIndex)}
                        >
                            <X className="size-4" />
                        </Button>

                    </div>
                )})}

                {choicesErrorMessage && (
                    <p className="text-red-500 text-sm">
                        {choicesErrorMessage}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
                <Button
                    type="button"
                    color="primary"
                    variant="flat"
                    size="sm"
                    startContent={<Plus className="size-4" />}
                    onPress={() => appendChoice({ text: "", isCorrect: false })}
                >
                    Ajouter un choix
                </Button>
            </div>

        </div>
    );
}
