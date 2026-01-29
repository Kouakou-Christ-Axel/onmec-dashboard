import { z } from 'zod';

export const DocumentCreateSchema = z.object({
  title: z.string({ message: "Le titre est requis" })
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(255, "Le titre ne doit pas dépasser 255 caractères")
    .trim(),

  description: z.string({ message: "La description est requise" })
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .trim()
    .optional(),

  userId: z.string({ message: "L'ID utilisateur doit être une chaîne" })
    .optional(),

  covers: z.instanceof(File),

  fichiers: z.instanceof(File),
});

export type DocumentCreateDTO = z.infer<typeof DocumentCreateSchema>;

// Schema pour la modification d'un document
export const DocumentUpdateSchema = DocumentCreateSchema.partial();
export type DocumentUpdateDTO = z.infer<typeof DocumentUpdateSchema>;
