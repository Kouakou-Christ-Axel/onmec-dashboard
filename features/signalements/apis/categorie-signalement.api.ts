import {api} from "@/lib/api";
import {
	ICategorieSignalement,
	ICreateCategorieSignalement,
	IUpdateCategorieSignalement
} from "@/features/signalements/type/categorie-signalement.types";

export interface ICategorieSignalementAPI {
	obtenirTousLesCategories(): Promise<ICategorieSignalement[]>;

	obtenirCategorie(id: string): Promise<ICategorieSignalement>;

	ajouterCategorie(data: ICreateCategorieSignalement): Promise<ICategorieSignalement>;

	modifierCategorie(id: string, data: IUpdateCategorieSignalement): Promise<ICategorieSignalement>;

	supprimerCategorie(id: string): Promise<{ message: string }>;
}

export const categorieSignalementApi: ICategorieSignalementAPI = {
	obtenirTousLesCategories(): Promise<ICategorieSignalement[]> {
		return api.request<ICategorieSignalement[]>({
			endpoint: `/categorie-signalement`,
			method: "GET",
		});
	},

	obtenirCategorie(id: string): Promise<ICategorieSignalement> {
		return api.request<ICategorieSignalement>({
			endpoint: `/categorie-signalement/${id}`,
			method: "GET",
		});
	},

	ajouterCategorie(data: ICreateCategorieSignalement): Promise<ICategorieSignalement> {
		return api.request<ICategorieSignalement>({
			endpoint: `/categorie-signalement`,
			method: "POST",
			data,
		});
	},

	modifierCategorie(id: string, data: IUpdateCategorieSignalement): Promise<ICategorieSignalement> {
		return api.request<ICategorieSignalement>({
			endpoint: `/categorie-signalement/${id}`,
			method: "PATCH",
			data,
		});
	},

	supprimerCategorie(id: string): Promise<{ message: string }> {
		return api.request<{ message: string }>({
			endpoint: `/categorie-signalement/${id}`,
			method: "DELETE",
		});
	},
};
