export type QuizDifficulte = 'FACILE' | 'MOYEN' | 'DIFFICILE';

export const QUIZ_DIFFICULTES: QuizDifficulte[] = ['FACILE', 'MOYEN', 'DIFFICILE'];

export interface IChoice {
	id?: string;
	text: string;
	isCorrect: boolean;
}

export interface IQuestion {
	id?: string;
	text: string;
	correctId?: string | null;
	choices: IChoice[];
}

export interface ICategorieQuiz {
	id: string;
	nom: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface IQuizz {
	id?: string;
	title: string;
	description?: string;
	authorId: string;
	difficulte?: QuizDifficulte;
	categorieId?: string;
	categorie?: ICategorieQuiz;
	questions: IQuestion[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IQuizzSearchParams {
	search?: string;
	categorieId?: string;
	difficulte?: QuizDifficulte;
	page?: number;
	limit?: number;
}
