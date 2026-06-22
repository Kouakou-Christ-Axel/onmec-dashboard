"use server";

import { ActionResponse } from "@/types/api.type";
import { handleServerActionError } from "@/utils/handleServerActionError";
import {
  ICommentairesPaginated,
  moderationApi,
} from "../apis/commentaire.api";
import {
  ICommentaire,
  ICommentaireSearchParams,
} from "../types/commentaire.types";

export const obtenirTousLesCommentairesAction = async (
  params: ICommentaireSearchParams
): Promise<ActionResponse<ICommentairesPaginated>> => {
  try {
    const data = await moderationApi.obtenirTousLesCommentaires(params);
    return {
      success: true,
      data: data,
      message: "Commentaires obtenus avec succès",
    };
  } catch (error) {
    return handleServerActionError(
      error,
      "Erreur lors de la récupération des commentaires"
    );
  }
};

export const masquerCommentaireAction = async (
  id: string,
  masque: boolean
): Promise<ActionResponse<ICommentaire>> => {
  try {
    const data = await moderationApi.masquerCommentaire(id, masque);
    return {
      success: true,
      data: data,
      message: masque
        ? "Commentaire masqué avec succès"
        : "Commentaire affiché avec succès",
    };
  } catch (error) {
    return handleServerActionError(
      error,
      "Erreur lors de la modification de la visibilité du commentaire"
    );
  }
};

export const supprimerCommentaireAction = async (
  id: string
): Promise<ActionResponse<ICommentaire>> => {
  try {
    const data = await moderationApi.supprimerCommentaire(id);
    return {
      success: true,
      data: data,
      message: "Commentaire supprimé avec succès",
    };
  } catch (error) {
    return handleServerActionError(
      error,
      "Erreur lors de la suppression du commentaire"
    );
  }
};
