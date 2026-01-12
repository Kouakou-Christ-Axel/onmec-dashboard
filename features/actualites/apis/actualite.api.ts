import {api} from "@/lib/api";
import {PaginatedResponse} from "@/types/api.type";
import {SearchParams} from "ak-api-http";
import {
	IActualite,
	IActualiteAddUpdateResponse,
	IActualiteDeleteResponse,
	IActualiteSearchParams
} from "../types/actualite.type";
import {ActualiteCreateDTO, ActualiteUpdateDTO} from "../schema/actualite.schema";

export interface IActualiteAPI {
	obtenirToutesActualites(params: IActualiteSearchParams): Promise<PaginatedResponse<IActualite>>;

	obtenirActualite(id: string): Promise<IActualite>;

	obtenirActualiteParSlug(slug: string): Promise<IActualite>;

	ajouterActualite(data: ActualiteCreateDTO): Promise<IActualiteAddUpdateResponse>;

	modifierActualite(id: string, data: ActualiteUpdateDTO): Promise<IActualiteAddUpdateResponse>;

	supprimerActualite(id: string): Promise<IActualiteDeleteResponse>;
}

export const actualiteApi: IActualiteAPI = {
	obtenirToutesActualites(params: IActualiteSearchParams): Promise<PaginatedResponse<IActualite>> {
		return api.request<PaginatedResponse<IActualite>>({
			endpoint: `/actualites`,
			method: "GET",
			searchParams: params as SearchParams,
		});
	},

	obtenirActualite(id: string): Promise<IActualite> {
		return api.request<IActualite>({
			endpoint: `/actualites/${id}`,
			method: "GET",
		});
	},

	obtenirActualiteParSlug(slug: string): Promise<IActualite> {
		return api.request<IActualite>({
			endpoint: `/actualites/slug/${slug}`,
			method: "GET",
		});
	},

	ajouterActualite(data: ActualiteCreateDTO): Promise<IActualiteAddUpdateResponse> {
		return api.request<IActualiteAddUpdateResponse>({
			endpoint: `/actualites`,
			method: "POST",
			data: data,
			config: {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			}
		});
	},

	modifierActualite(id: string, data: ActualiteUpdateDTO): Promise<IActualiteAddUpdateResponse> {
		return api.request<IActualiteAddUpdateResponse>({
			endpoint: `/actualites/${id}`,
			method: "PATCH",
			data: data,
			config: {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			}
		});
	},

	supprimerActualite(id: string): Promise<IActualiteDeleteResponse> {
		return api.request<IActualiteDeleteResponse>({
			endpoint: `/actualites/${id}`,
			method: "DELETE",
		});
	},
};
