"use server";

import {ActionResponse, PaginatedResponse} from "@/types/api.type";
import {librairieApi} from "../apis/librairie.api";
import {DocumentCreateDTO, DocumentUpdateDTO} from "../schema/document.schema";
import {
	IDocument,
	IDocumentSearchParams
} from "../types/document.types";
import {handleServerActionError} from "@/utils/handleServerActionError";

export const obtenirTousLesDocumentsAction = async (params: IDocumentSearchParams): Promise<ActionResponse<PaginatedResponse<IDocument>>> => {
	try {
		const data = await librairieApi.obtenirTousLesDocuments(params);
		return {
			success: true,
			data: data,
			message: "Documents obtenues avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération des documents");
	}
}

export const obtenirUnDocumentAction = async (id: string): Promise<ActionResponse<IDocument>> => {
	try {
		const data = await librairieApi.obtenirDocument(id);
		return {
			success: true,
			data: data,
			message: "Document obtenu avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la récupération du document");
	}
}

export const ajouterDocumentAction = async (formData: DocumentCreateDTO): Promise<ActionResponse<IDocument>> => {
	try {
		const data = await librairieApi.ajouterDocument(formData as unknown as FormData);
		return {
			success: true,
			data: data,
			message: "Document ajouté avec succès",
		}
	} catch (error) {
		console.error("Error in ajouterDocumentAction:", error);
		return handleServerActionError(error, "Erreur lors de l'ajout du document");
	}
}

export const modifierDocumentAction = async (id: string, formData: DocumentUpdateDTO): Promise<ActionResponse<IDocument>> => {
	try {
		const data = await librairieApi.modifierDocument(id, formData);
		return {
			success: true,
			data: data,
			message: "Document modifié avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la modification du document");
	}
}

export const supprimerDocumentAction = async (id: string): Promise<ActionResponse<IDocument>> => {
	try {
		const data = await librairieApi.supprimerDocument(id);
		return {
			success: true,
			data: data,
			message: "Document supprimé avec succès",
		}
	} catch (error) {
		return handleServerActionError(error, "Erreur lors de la suppression du document");
	}
}

