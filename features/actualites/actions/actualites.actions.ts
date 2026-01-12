"use server";

import {ActionResponse, PaginatedResponse} from "@/types/api.type";
import {actualiteApi} from "../apis/actualite.api";
import {ActualiteCreateDTO, ActualiteUpdateDTO} from "../schema/actualite.schema";
import {
	IActualite,
	IActualiteAddUpdateResponse,
	IActualiteDeleteResponse,
	IActualiteSearchParams
} from "../types/actualite.type";
import {handleServerActionError} from "@/utils/handleServerActionError";

export const obtenirToutesActualitesAction = async (params: IActualiteSearchParams): Promise<ActionResponse<PaginatedResponse<IActualite>>> => {
	try {
		const data = await actualiteApi.obtenirToutesActualites(params);
		return {
			success: true,
			data: data,
			message: "Actualités obtenues avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des actualités");
	}
}

export const obtenirUneActualiteAction = async (id: string): Promise<ActionResponse<IActualite>> => {
	try {
		const data = await actualiteApi.obtenirActualite(id);
		return {
			success: true,
			data: data,
			message: "Actualité obtenue avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération de l'actualité");
	}
}

export const obtenirActualiteParSlugAction = async (slug: string): Promise<ActionResponse<IActualite>> => {
	try {
		const data = await actualiteApi.obtenirActualiteParSlug(slug);
		return {
			success: true,
			data: data,
			message: "Actualité obtenue avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération de l'actualité");
	}
}

export const ajouterActualiteAction = async (formdata: ActualiteCreateDTO): Promise<ActionResponse<IActualiteAddUpdateResponse>> => {
	try {
		const data = await actualiteApi.ajouterActualite(formdata);
		return {
			success: true,
			data: data,
			message: "Actualité ajoutée avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de l'ajout de l'actualité");
	}
}

export const modifierActualiteAction = async (id: string, formdata: ActualiteUpdateDTO): Promise<ActionResponse<IActualiteAddUpdateResponse>> => {
	try {
		const data = await actualiteApi.modifierActualite(id, formdata);
		return {
			success: true,
			data: data,
			message: "Actualité modifiée avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la modification de l'actualité");
	}
}

export const supprimerActualiteAction = async (id: string): Promise<ActionResponse<IActualiteDeleteResponse>> => {
	try {
		const data = await actualiteApi.supprimerActualite(id);
		return {
			success: true,
			data: data,
			message: "Actualité supprimée avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la suppression de l'actualité");
	}
}

