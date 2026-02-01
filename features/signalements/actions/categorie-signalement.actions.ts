"use server";

import {ActionResponse} from "@/types/api.type";
import {categorieSignalementApi} from "@/features/signalements";
import {handleServerActionError} from "@/utils/handleServerActionError";
import {
	ICategorieSignalement,
	ICreateCategorieSignalement,
	IUpdateCategorieSignalement
} from "@/features/signalements";

export const obtenirTousLesCategoriesAction = async (): Promise<ActionResponse<ICategorieSignalement[]>> => {
	try {
		const data = await categorieSignalementApi.obtenirTousLesCategories();
		return {
			success: true,
			data: data,
			message: "Catégories obtenites avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des catégories");
	}
}

export const obtenirUneCategorieAction = async (id: string): Promise<ActionResponse<ICategorieSignalement>> => {
	try {
		const data = await categorieSignalementApi.obtenirCategorie(id);
		return {
			success: true,
			data: data,
			message: "Catégorie obtenue avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération de la catégorie");
	}
}

export const ajouterCategorieAction = async (data: ICreateCategorieSignalement): Promise<ActionResponse<ICategorieSignalement>> => {
	try {
		const result = await categorieSignalementApi.ajouterCategorie(data);
		return {
			success: true,
			data: result,
			message: "Catégorie ajoutée avec succès",
		}
	} catch (error) {
		console.error("Error in ajouterCategorieAction:", error);
		return handleServerActionError(error, "Erreur lors de l'ajout de la catégorie");
	}
}

export const modifierCategorieAction = async (id: string, data: IUpdateCategorieSignalement): Promise<ActionResponse<ICategorieSignalement>> => {
	try {
		const result = await categorieSignalementApi.modifierCategorie(id, data);
		return {
			success: true,
			data: result,
			message: "Catégorie modifiée avec succès",
		}
	} catch (error) {
		console.error("Error in modifierCategorieAction:", error);
		return handleServerActionError(error, "Erreur lors de la modification de la catégorie");
	}
}

export const supprimerCategorieAction = async (id: string): Promise<ActionResponse<{ message: string }>> => {
	try {
		const result = await categorieSignalementApi.supprimerCategorie(id);
		return {
			success: true,
			data: result,
			message: "Catégorie supprimée avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la suppression de la catégorie");
	}
}
