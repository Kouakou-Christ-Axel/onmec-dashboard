"use server";

import {ActionResponse, PaginatedResponse} from "@/types/api.type";
import {signalementsApi} from "@/features/signalements";
import {SignalementCreateDTO, SignalementUpdateDTO} from "@/features/signalements";
import {
	ISignalement,
	ISignalementSearchParams
} from "@/features/signalements";
import {handleServerActionError} from "@/utils/handleServerActionError";

export const obtenirTousLesSignalementsAction = async (params: ISignalementSearchParams): Promise<ActionResponse<PaginatedResponse<ISignalement>>> => {
	try {
		const data = await signalementsApi.obtenirTousLesSignalements(params);
		return {
			success: true,
			data: data,
			message: "Signalements obtenus avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des signalements");
	}
}

export const obtenirUnSignalementAction = async (id: string): Promise<ActionResponse<ISignalement>> => {
	try {
		const data = await signalementsApi.obtenirSignalement(id);
		return {
			success: true,
			data: data,
			message: "Signalement obtenu avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération du signalement");
	}
}

export const ajouterSignalementAction = async (formData: SignalementCreateDTO): Promise<ActionResponse<ISignalement>> => {
	try {
		const data = await signalementsApi.ajouterSignalement(formData as unknown as FormData);
		return {
			success: true,
			data: data,
			message: "Signalement ajouté avec succès",
		}
	} catch (error) {
		console.error("Error in ajouterSignalementAction:", error);
		return handleServerActionError(error, "Erreur lors de l'ajout du signalement");
	}
}

export const modifierSignalementAction = async (id: string, formData: SignalementUpdateDTO): Promise<ActionResponse<ISignalement>> => {
	try {
		const data = await signalementsApi.modifierSignalement(id, formData as unknown as FormData);
		return {
			success: true,
			data: data,
			message: "Signalement modifié avec succès",
		}
	} catch (error) {
		console.error("Error in modifierSignalementAction:", error);
		return handleServerActionError(error, "Erreur lors de la modification du signalement");
	}
}

export const supprimerSignalementAction = async (id: string): Promise<ActionResponse<ISignalement>> => {
	try {
		const data = await signalementsApi.supprimerSignalement(id);
		return {
			success: true,
			data: data,
			message: "Signalement supprimé avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la suppression du signalement");
	}
}
