export interface IActualite {
	id: string;
	slug: string;
	date: Date;
	excerpt: string;
	imageUrl: string | null;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IActualiteSearchParams {
	search?: string;
	page?: number;
	limit?: number;
	dateFrom?: string;
	dateTo?: string;
	hasImage?: boolean;
}

export interface IActualiteAddUpdateResponse {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	imageUrl: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface IActualiteDeleteResponse {
	id: string;
	slug: string;
	title: string;
}