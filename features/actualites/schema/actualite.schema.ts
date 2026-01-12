import { z } from 'zod';

// Schema pour la création d'une actualité
export const ActualiteCreateSchema = z.object({
  title: z.string({ message: "Le titre est requis" })
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(255, "Le titre ne doit pas dépasser 255 caractères")
    .trim(),

  excerpt: z.string({ message: "L'extrait est requis" })
    .min(10, "L'extrait doit contenir au moins 10 caractères")
    .max(500, "L'extrait ne doit pas dépasser 500 caractères")
    .trim(),

  content: z.string({ message: "Le contenu est requis" })
    .min(20, "Le contenu doit contenir au moins 20 caractères")
    .trim(),

  date: z.date({ message: "La date est requise et doit être valide" })
    .refine((date) => date <= new Date(), "La date ne peut pas être dans le futur"),

  image: z.instanceof(File).optional(),
});

export type ActualiteCreateDTO = z.infer<typeof ActualiteCreateSchema>;

// Schema pour la modification d'une actualité
export const ActualiteUpdateSchema = ActualiteCreateSchema.partial();
export type ActualiteUpdateDTO = z.infer<typeof ActualiteUpdateSchema>;
