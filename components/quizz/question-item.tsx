"use client";

import { useFieldArray, Control, UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import { QuizzCreateDTO } from "@/features/quizz/schema/quizz.schema";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/react";
import { Trash, X } from "lucide-react";


type Props = {
    qIndex: number;
    control: Control<QuizzCreateDTO>;
    register: UseFormRegister<QuizzCreateDTO>;
    errors: FieldErrors<QuizzCreateDTO>;
    removeQuestion: (index: number) => void;
};

export default function QuestionItem({
    qIndex,
    control,
    register,
    errors,
    removeQuestion,
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

    return (
        <div className="border p-4 space-y-4 rounded-xl">

            {/* Texte question */}
            <div>
                <Input
                    {...register(`questions.${qIndex}.text`)}
                    placeholder="Texte de la question"
                />

                {errors.questions?.[qIndex]?.text && (
                    <p className="text-red-500 text-sm">
                        {errors.questions[qIndex]?.text?.message}
                    </p>
                )}
            </div>

            {/* Choices */}
            <div className="space-y-2">
                {choiceFields.map((choice, cIndex) => {
                    const choiceTextError = (
                        errors.questions?.[qIndex]?.choices as
                            | Array<{ text?: { message?: string } }>
                            | undefined
                    )?.[cIndex]?.text?.message;

                    return (
                    <div key={choice.id} className="flex gap-2 items-start">

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

                        <div className="flex-1 space-y-1">
                            <Input
                                {...register(`questions.${qIndex}.choices.${cIndex}.text`)}
                                placeholder={`Choix ${cIndex + 1}`}
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
                            size="sm"
                            onClick={() => removeChoice(cIndex)}
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
            <div className="flex gap-3 pt-2">
                <Button
                    type="button"
                    color="primary"
                    size="sm"
                    onPress={() => appendChoice({ text: "", isCorrect: false })}
                >
                    Ajouter un choix
                </Button>

                <Button
                    type="button"
                    color="danger"
                    size="sm"
                    onPress={() => removeQuestion(qIndex)}
                >
                    <Trash className="size-4" />
                </Button>
            </div>

        </div>
    );
}