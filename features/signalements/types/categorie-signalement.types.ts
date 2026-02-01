export interface ICategorieSignalement {
	id: string;
	nom: string;
	description?: string | null;
	validationObligatoire: boolean;
	createdAt?: string | Date;
	updatedAt?: string | Date;
	deletedAt?: string | Date | null;
}

export interface ICreateCategorieSignalement {
	nom: string;
	description?: string;
	validationObligatoire: boolean;
}

export interface IUpdateCategorieSignalement {
	nom?: string;
	description?: string;
	validationObligatoire?: boolean;
}
