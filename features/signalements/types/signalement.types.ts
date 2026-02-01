/**
 * Interface pour un signalement citoyen
 */
export interface ISignalement {
  id: string;
  titre: string;
  description: string;
  categorieId: string;
  categorie?: {
    id: string;
    nom: string;
    description?: string | null;
  };
  validation: boolean;
  adresse: string;
  latitude: number;
  longitude: number;
  photo?: string | null; // URL de la photo
  statut: 'NOUVEAU' | 'EN_COURS' | 'RESOLU' | 'REJETE';
  citoyenId?: string | null;
  citoyen?: {
    id: string;
    fullname: string;
    email: string;
  } | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date | null;
}

/**
 * Paramètres de recherche pour les signalements
 */
export interface ISignalementSearchParams {
  titre?: string;
  categorieId?: string;
  statut?: 'NOUVEAU' | 'EN_COURS' | 'RESOLU' | 'REJETE';
  latitude?: number;
  longitude?: number;
  citoyenId?: string;
  page?: number;
  limit?: number;
}
