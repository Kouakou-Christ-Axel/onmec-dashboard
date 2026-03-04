import { z } from 'zod';

/**
 * Schéma Zod pour créer un signalement citoyen
 */
export const SignalementCreateSchema = z.object({
  titre: z.string({ message: "Le titre est requis" })
    .min(5, "Le titre doit contenir au moins 5 caractères")
    .max(255, "Le titre ne doit pas dépasser 255 caractères")
    .trim(),

  description: z.string({ message: "La description est requise" })
    .min(20, "La description doit contenir au moins 20 caractères")
    .max(2000, "La description ne doit pas dépasser 2000 caractères")
    .trim(),

  categorieId: z.uuid({ message: "L'ID catégorie est requis" }),

  adresse: z.string({ message: "L'adresse est requise" })
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(255, "L'adresse ne doit pas dépasser 255 caractères")
    .trim(),

  latitude: z.number({ message: "La latitude doit être un nombre" })
    .min(-90, "La latitude doit être entre -90 et 90")
    .max(90, "La latitude doit être entre -90 et 90"),

  longitude: z.number({ message: "La longitude doit être un nombre" })
    .min(-180, "La longitude doit être entre -180 et 180")
    .max(180, "La longitude doit être entre -180 et 180"),

  statut: z.enum(['NOUVEAU', 'EN_COURS', 'RESOLU', 'REJETE'], {
    message: "Le statut doit être l'un des: NOUVEAU, EN_COURS, RESOLU, REJETE"
  }).default('NOUVEAU'),

  photo: z.instanceof(File).optional(),
});

export type SignalementCreateDTO = z.infer<typeof SignalementCreateSchema>;

/**
 * Schéma Zod pour mettre à jour un signalement citoyen
 */
export const SignalementUpdateSchema = SignalementCreateSchema.partial().extend({
  validation: z.boolean({ message: "La validation doit être un booléen" }).optional(),
});

export type SignalementUpdateDTO = z.infer<typeof SignalementUpdateSchema>;

/**
 * Schéma Zod pour créer une catégorie de signalement
 */
export const CategorieSignalementCreateSchema = z.object({
  nom: z.string({ message: "Le nom est requis" })
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom ne doit pas dépasser 100 caractères")
    .trim(),

  description: z.string({ message: "La description est requise" })
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .trim()
    .optional(),

  validationObligatoire: z.boolean({ message: "La validation doit être un booléen" })
    .default(false),
});

export type CategorieSignalementCreateDTO = z.infer<typeof CategorieSignalementCreateSchema>;

/**
 * Schéma Zod pour mettre à jour une catégorie de signalement
 */
export const CategorieSignalementUpdateSchema = CategorieSignalementCreateSchema.partial();

export type CategorieSignalementUpdateDTO = z.infer<typeof CategorieSignalementUpdateSchema>;
