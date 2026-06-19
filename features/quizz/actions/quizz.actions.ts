"use server";

import { ActionResponse, PaginatedResponse } from "@/types/api.type";
import { quizzApi } from "../apis/quizz.api";
import { QuizzCreateDTO } from "../schema/quizz.schema";
import { CategorieQuizCreateDTO } from "../schema/categorie-quiz.schema";
import { ICategorieQuiz, IQuizz, IQuizzSearchParams } from "../types/quizz.type";
import { handleServerActionError } from "@/utils/handleServerActionError";

export const ajouterQuizzAction = async (formdata: QuizzCreateDTO): Promise<ActionResponse<IQuizz>> => {
    try {
        const data = await quizzApi.ajouterQuizz(formdata);
        return {
            success: true,
            data: data,
            message: "Quizz ajouté avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de l'ajout du quizz");
    }
}

export const obtenirQuizzParIdAction = async (id: string): Promise<ActionResponse<IQuizz>> => {
    try {
        console.log(id, "id action")
        const data = await quizzApi.obtenirQuizzParId(id);
        return {
            success: true,
            data: data,
            message: "Quizz obtenu avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération du quizz");
    }
}

export const obtenirTousQuizzAction = async (params: IQuizzSearchParams): Promise<ActionResponse<PaginatedResponse<IQuizz>>> => {
    try {
        const data = await quizzApi.obtenirTousQuizz(params);
        return {
            success: true,
            data: data,
            message: "Quizz obtenus avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération des quizz");
    }
}

export const modifierQuizzAction = async (id: string, formdata: QuizzCreateDTO): Promise<ActionResponse<IQuizz>> => {
    try {
        const data = await quizzApi.modifierQuizz(id, formdata);
        return {
            success: true,
            data: data,
            message: "Quizz modifié avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la modification du quizz");
    }
}

export const supprimerQuizzAction = async (id: string): Promise<ActionResponse<void>> => {
    try {
        await quizzApi.supprimerQuizz(id);
        return {
            success: true,
            message: "Quizz supprimé avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la suppression du quizz");
    }
}

// ---- Catégories de quizz ----

export const obtenirCategoriesQuizzAction = async (): Promise<ActionResponse<ICategorieQuiz[]>> => {
    try {
        const data = await quizzApi.obtenirCategories();
        return {
            success: true,
            data: data,
            message: "Catégories obtenues avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la récupération des catégories");
    }
}

export const ajouterCategorieQuizzAction = async (data: CategorieQuizCreateDTO): Promise<ActionResponse<ICategorieQuiz>> => {
    try {
        const result = await quizzApi.ajouterCategorie(data);
        return {
            success: true,
            data: result,
            message: "Catégorie ajoutée avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de l'ajout de la catégorie");
    }
}

export const modifierCategorieQuizzAction = async (id: string, data: CategorieQuizCreateDTO): Promise<ActionResponse<ICategorieQuiz>> => {
    try {
        const result = await quizzApi.modifierCategorie(id, data);
        return {
            success: true,
            data: result,
            message: "Catégorie modifiée avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la modification de la catégorie");
    }
}

export const supprimerCategorieQuizzAction = async (id: string): Promise<ActionResponse<void>> => {
    try {
        await quizzApi.supprimerCategorie(id);
        return {
            success: true,
            message: "Catégorie supprimée avec succès",
        }
    } catch (error) {
        return handleServerActionError(error, "Erreur lors de la suppression de la catégorie");
    }
}