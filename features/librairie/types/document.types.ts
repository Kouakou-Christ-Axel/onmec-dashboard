export interface IDocument {
  id: string;
  title: string;
  description?: string | null;
  coverImage?: string | null; // chemin local ou URL vers l'image de couverture
  fileUrl: string; // chemin local ou URL vers le fichier uploadé
  fileType: string; // ex: "pdf", "docx", "epub"
  uploadedAt: string | Date;
  uploadedById?: string | null;
  uploadedBy?: {
    id: string;
    // ajouter d'autres champs utilisateur si nécessaire
  } | null;
}

export interface IDocumentSearchParams {

}