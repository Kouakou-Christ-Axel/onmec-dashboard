import { api } from "@/lib/api";
import { QuizzCreateDTO } from "../schema/quizz.schema";
import { IQuizz } from "../types/quizz.type";
import { PaginatedResponse } from "@/types/api.type";

export interface IQuizzAPI {
    obtenirTousLesQuizz(params: IQuizz): Promise<PaginatedResponse<IQuizz>>;

    obtenirQuizzParId(id: string): Promise<IQuizz>;

    ajouterQuizz(data: QuizzCreateDTO): Promise<IQuizz>;

    //modifierQuizz(id: string, data: QuizzCreateDTO): Promise<IQuizz>;
}

export const quizzApi: IQuizzAPI = {
    obtenirTousLesQuizz(params: IQuizz): Promise<PaginatedResponse<IQuizz>> {
        return api.request<PaginatedResponse<IQuizz>>({
            endpoint: `/quizz`,
            method: "GET",
        });
    },

    obtenirQuizzParId(id: string): Promise<IQuizz> {
        return api.request<IQuizz>({
            endpoint: `/quizz/${id}`,
            method: "GET",
        });
    },
    ajouterQuizz: function (data: QuizzCreateDTO): Promise<IQuizz> {
        return api.request<IQuizz>({
            endpoint: `/quizz`,
            method: "POST",
            data: data,
        });
    }
}