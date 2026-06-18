import { z } from 'zod';

// Schema pour la création / modification d'une catégorie de quizz
export const CategorieQuizSchema = z.object({
    nom: z.string({ message: "Le nom est requis" })
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .trim(),

    description: z.string().optional(),
});

export type CategorieQuizCreateDTO = z.infer<typeof CategorieQuizSchema>;
