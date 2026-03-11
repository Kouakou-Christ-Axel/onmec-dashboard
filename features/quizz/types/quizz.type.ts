export interface IChoice {
	text: string;
	isCorrect: boolean;
}

export interface IQuestion {
	text: string;
	choices: IChoice[];
}

export interface IQuizz {
	title: string;
	description?: string;
	authorId: string;
	questions: IQuestion[];
}