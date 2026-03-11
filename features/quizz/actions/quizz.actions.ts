"use server";

import { ActionResponse, PaginatedResponse } from "@/types/api.type";
import { quizzApi } from "../apis/quizz.api";
import { QuizzCreateDTO } from "../schema/quizz.schema";
import { IQuizz } from "../types/quizz.type";
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

export const obtenirTousQuizzAction = async (params: IQuizz): Promise<ActionResponse<PaginatedResponse<IQuizz>>> => {
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