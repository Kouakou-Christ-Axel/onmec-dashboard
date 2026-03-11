import { z } from 'zod';

// Schema pour la création d'un choix
export const ChoiceSchema = z.object({
    text: z.string()
    .min(1, "Le texte du choix est obligatoire"),
    isCorrect: z.boolean()

});

// Schema pour la création d'une question

export const QuestionSchema = z.object({
    text: z.string()
    .min(1, "Le texte de la question est obligatoire"),

    choices: z.array(ChoiceSchema)
        .min(2, "Le quizz doit contenir au moins un choix")
}).superRefine((question, ctx) => {
    const hasCorrectChoice = question.choices.some((choice) => choice.isCorrect);

    if (!hasCorrectChoice) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["choices", 0, "isCorrect"],
            message: "Sélectionnez au moins une bonne réponse"
        });
    }
});

// Schema pour la création d'un quizz
export const QuizzSchema = z.object({
    title: z.string({ message: "Le titre est requis" })
        .min(3, "Le titre doit contenir au moins 3 caractères")
        .trim(),

    description: z.string().optional(),

    authorId: z.string()
        .min(1, "AuthorId est obligatoire"),

    questions: z.array(QuestionSchema)
        .min(1, "Le quizz doit contenir au moins une question")
});

export type QuizzCreateDTO = z.infer<typeof QuizzSchema>

