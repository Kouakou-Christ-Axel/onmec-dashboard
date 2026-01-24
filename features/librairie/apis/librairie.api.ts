import {api} from "@/lib/api";
import {PaginatedResponse} from "@/types/api.type";
import {SearchParams} from "ak-api-http";
import {
	IDocument,
	IDocumentSearchParams
} from "../types/document.types";
import {DocumentCreateDTO, DocumentUpdateDTO} from "../schema/document.schema";

export interface IDocumentAPI {
	obtenirTousLesDocuments(params: IDocumentSearchParams): Promise<PaginatedResponse<IDocument>>;

	obtenirDocument(id: string): Promise<IDocument>;

	ajouterDocument(data: FormData): Promise<IDocument>;

	modifierDocument(id: string, data: DocumentUpdateDTO): Promise<IDocument>;

	supprimerDocument(id: string): Promise<IDocument>;
}

export const librairieApi: IDocumentAPI = {
	obtenirTousLesDocuments(params: IDocumentSearchParams): Promise<PaginatedResponse<IDocument>> {
		return api.request<PaginatedResponse<IDocument>>({
			endpoint: `/librairie`,
			method: "GET",
			searchParams: params as SearchParams,
		});
	},

	obtenirDocument(id: string): Promise<IDocument> {
		return api.request<IDocument>({
			endpoint: `/librairie/${id}`,
			method: "GET",
		});
	},

	ajouterDocument(data: FormData): Promise<IDocument> {
		return api.request<IDocument>({
			endpoint: `/librairie`,
			method: "POST",
			data,
		});
	},

	modifierDocument(id: string, data: DocumentUpdateDTO): Promise<IDocument> {
		return api.request<IDocument>({
			endpoint: `/librairie/${id}`,
			method: "PATCH",
			data,
			config: {
				headers: {
					"Content-Type": "multipart/form-data",
				}
			}
		});
	},

	supprimerDocument(id: string): Promise<IDocument> {
		return api.request<IDocument>({
			endpoint: `/librairie/${id}`,
			method: "DELETE",
		});
	},
};
