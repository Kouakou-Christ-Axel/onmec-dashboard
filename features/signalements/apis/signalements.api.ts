import {api} from "@/lib/api";
import {PaginatedResponse} from "@/types/api.type";
import {SearchParams} from "ak-api-http";
import {ISignalement, ISignalementSearchParams} from "@/features/signalements";

export interface ISignalementAPI {
	obtenirTousLesSignalements(params: ISignalementSearchParams): Promise<PaginatedResponse<ISignalement>>;

	obtenirSignalement(id: string): Promise<ISignalement>;

	ajouterSignalement(data: FormData): Promise<ISignalement>;

	modifierSignalement(id: string, data: FormData): Promise<ISignalement>;

	supprimerSignalement(id: string): Promise<ISignalement>;
}

export const signalementsApi: ISignalementAPI = {
	obtenirTousLesSignalements(params: ISignalementSearchParams): Promise<PaginatedResponse<ISignalement>> {
		return api.request<PaginatedResponse<ISignalement>>({
			endpoint: `/signalement-citoyen`,
			method: "GET",
			searchParams: params as SearchParams,
		});
	},

	obtenirSignalement(id: string): Promise<ISignalement> {
		return api.request<ISignalement>({
			endpoint: `/signalement-citoyen/${id}`,
			method: "GET",
		});
	},

	ajouterSignalement(data: FormData): Promise<ISignalement> {
		return api.request<ISignalement>({
			endpoint: `/signalement-citoyen`,
			method: "POST",
			data,
			config: {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			}
		});
	},

	modifierSignalement(id: string, data: FormData): Promise<ISignalement> {
		return api.request<ISignalement>({
			endpoint: `/signalement-citoyen/${id}`,
			method: "PATCH",
			data,
			config: {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			}
		});
	},

	supprimerSignalement(id: string): Promise<ISignalement> {
		return api.request<ISignalement>({
			endpoint: `/signalement-citoyen/${id}`,
			method: "DELETE",
		});
	},
};

