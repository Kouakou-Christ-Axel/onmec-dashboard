import { z } from 'zod';

// Schema pour l'ajout d'un utilisateur
export const UtilisateurAddSchema = z.object({
  fullname: z.string({ message: "Le nom complet est requis" })
    .min(2, "Le nom complet doit contenir au moins 2 caractères")
    .max(100, "Le nom complet ne doit pas dépasser 100 caractères")
    .trim(),

  email: z.string({ message: "L'email est requis" })
    .email("L'email doit être une adresse valide")
    .max(100, "L'email ne doit pas dépasser 100 caractères")
    .toLowerCase()
    .trim(),

  phone: z.string({ message: "Le numéro de téléphone est requis" })
    .max(20, "Le numéro de téléphone ne doit pas dépasser 20 caractères")
    .regex(/^\+?[\d\s\-]+$/, "Numéro de téléphone invalide")
    .trim(),

  role: z.enum(['ADMIN', 'MEMBER'], { message: "Le rôle est requis" })
});

export type UtilisateurAddDTO = z.infer<typeof UtilisateurAddSchema>;


// Schema pour la modification d'un utilisateur
export const UtilisateurUpdateSchema = UtilisateurAddSchema.partial();
export type UtilisateurUpdateDTO = z.infer<typeof UtilisateurUpdateSchema>;


// Schema pour la modification du role d'un utilisateur
export const UtilisateurRoleSchema = UtilisateurAddSchema.pick({ role: true });
export type UtilisateurRoleDTO = z.infer<typeof UtilisateurRoleSchema>;
