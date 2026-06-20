import { z } from 'zod';

// Doit rester aligné avec les exigences du backend (UploadValidationPipe)
const MAX_DOC_SIZE_MB = 20;
const MAX_COVER_SIZE_MB = 5;
const MAX_DOC_SIZE_BYTES = MAX_DOC_SIZE_MB * 1024 * 1024;
const MAX_COVER_SIZE_BYTES = MAX_COVER_SIZE_MB * 1024 * 1024;

const ALLOWED_DOC_EXTENSIONS = ['.pdf', '.epub', '.mobi', '.docx', '.txt'];
const ALLOWED_COVER_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const getExtension = (filename: string): string => {
  const idx = filename.lastIndexOf('.');
  return idx !== -1 ? filename.slice(idx).toLowerCase() : '';
};

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

  covers: z.instanceof(File, { message: "L'image de couverture est requise" })
    .refine(
      (file) => ALLOWED_COVER_EXTENSIONS.includes(getExtension(file.name)),
      `Format de couverture non supporté. Formats acceptés : ${ALLOWED_COVER_EXTENSIONS.join(', ')}.`,
    )
    .refine(
      (file) => file.size <= MAX_COVER_SIZE_BYTES,
      `Image de couverture trop volumineuse. Taille maximale : ${MAX_COVER_SIZE_MB}MB.`,
    ),

  fichiers: z.instanceof(File, { message: "Le fichier du document est requis" })
    .refine(
      (file) => ALLOWED_DOC_EXTENSIONS.includes(getExtension(file.name)),
      `Format de document non supporté. Formats acceptés : ${ALLOWED_DOC_EXTENSIONS.join(', ')}.`,
    )
    .refine(
      (file) => file.size <= MAX_DOC_SIZE_BYTES,
      `Document trop volumineux. Taille maximale : ${MAX_DOC_SIZE_MB}MB.`,
    ),
});

export type DocumentCreateDTO = z.infer<typeof DocumentCreateSchema>;

// Schema pour la modification d'un document
export const DocumentUpdateSchema = DocumentCreateSchema.partial();
export type DocumentUpdateDTO = z.infer<typeof DocumentUpdateSchema>;
