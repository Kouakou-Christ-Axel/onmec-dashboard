import { api } from "@/lib/api";
import { SearchParams } from "ak-api-http";
import {
  ICommentaire,
  ICommentaireSearchParams,
} from "../types/commentaire.types";

/**
 * Réponse paginée renvoyée par l'API de modération des commentaires.
 * Le backend renvoie une structure plate { data, total, page, limit }.
 */
export interface ICommentairesPaginated {
  data: ICommentaire[];
  total: number;
  page: number;
  limit: number;
}

export interface ICommentaireAPI {
  obtenirTousLesCommentaires(
    params: ICommentaireSearchParams
  ): Promise<ICommentairesPaginated>;

  masquerCommentaire(id: string, masque: boolean): Promise<ICommentaire>;

  supprimerCommentaire(id: string): Promise<ICommentaire>;
}

export const moderationApi: ICommentaireAPI = {
  obtenirTousLesCommentaires(
    params: ICommentaireSearchParams
  ): Promise<ICommentairesPaginated> {
    return api.request<ICommentairesPaginated>({
      endpoint: `/commentaires`,
      method: "GET",
      searchParams: params as SearchParams,
    });
  },

  masquerCommentaire(id: string, masque: boolean): Promise<ICommentaire> {
    return api.request<ICommentaire>({
      endpoint: `/commentaires/${id}/masquer`,
      method: "PATCH",
      data: { masque },
    });
  },

  supprimerCommentaire(id: string): Promise<ICommentaire> {
    return api.request<ICommentaire>({
      endpoint: `/commentaires/${id}`,
      method: "DELETE",
    });
  },
};
