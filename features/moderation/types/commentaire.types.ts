export type CibleType = "signalement" | "actualite";

export interface ICommentaireAuteur {
  id: string;
  nom: string;
}

export interface ICommentaireCible {
  type: CibleType;
  id: string;
  titre: string;
}

export interface ICommentaire {
  id: string;
  contenu: string;
  createdAt: string | Date;
  masque: boolean;
  auteur: ICommentaireAuteur;
  cible: ICommentaireCible;
}

export interface ICommentaireSearchParams {
  page?: number;
  limit?: number;
  cible?: CibleType;
}
