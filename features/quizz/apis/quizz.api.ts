import { api } from "@/lib/api";
import { QuizzCreateDTO } from "../schema/quizz.schema";
import { CategorieQuizCreateDTO } from "../schema/categorie-quiz.schema";
import { ICategorieQuiz, IQuizz, IQuizzSearchParams } from "../types/quizz.type";
import { PaginatedResponse } from "@/types/api.type";

export interface IQuizzAPI {
    obtenirTousQuizz(params: IQuizzSearchParams): Promise<PaginatedResponse<IQuizz>>;

    obtenirQuizzParId(id: string): Promise<IQuizz>;

    ajouterQuizz(data: QuizzCreateDTO): Promise<IQuizz>;

    modifierQuizz(id: string, data: QuizzCreateDTO): Promise<IQuizz>;

    supprimerQuizz(id: string): Promise<void>;

    // Catégories de quizz
    obtenirCategories(): Promise<ICategorieQuiz[]>;

    ajouterCategorie(data: CategorieQuizCreateDTO): Promise<ICategorieQuiz>;

    modifierCategorie(id: string, data: CategorieQuizCreateDTO): Promise<ICategorieQuiz>;

    supprimerCategorie(id: string): Promise<void>;
}

export const quizzApi: IQuizzAPI = {
    obtenirTousQuizz(params: IQuizzSearchParams): Promise<PaginatedResponse<IQuizz>> {
        return api.request<PaginatedResponse<IQuizz>>({
            endpoint: `/quizz`,
            method: "GET",
            searchParams: params
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
    },

    modifierQuizz(id: string, data: QuizzCreateDTO): Promise<IQuizz> {
        return api.request<IQuizz>({
            endpoint: `/quizz/${id}`,
            method: "PATCH",
            data: data,
        });
    },

    supprimerQuizz(id: string): Promise<void> {
        return api.request<void>({
            endpoint: `/quizz/${id}`,
            method: "DELETE",
        });
    },

    obtenirCategories(): Promise<ICategorieQuiz[]> {
        return api.request<ICategorieQuiz[]>({
            endpoint: `/quizz/categories`,
            method: "GET",
        });
    },

    ajouterCategorie(data: CategorieQuizCreateDTO): Promise<ICategorieQuiz> {
        return api.request<ICategorieQuiz>({
            endpoint: `/quizz/categories`,
            method: "POST",
            data: data,
        });
    },

    modifierCategorie(id: string, data: CategorieQuizCreateDTO): Promise<ICategorieQuiz> {
        return api.request<ICategorieQuiz>({
            endpoint: `/quizz/categories/${id}`,
            method: "PATCH",
            data: data,
        });
    },

    supprimerCategorie(id: string): Promise<void> {
        return api.request<void>({
            endpoint: `/quizz/categories/${id}`,
            method: "DELETE",
        });
    }
}
