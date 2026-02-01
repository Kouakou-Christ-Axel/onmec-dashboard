import { parseAsInteger, parseAsString } from 'nuqs';

/**
 * Définit les schémas de parsing pour les paramètres de requête d'URL
 * utilisés pour filtrer et paginer la liste des signalements citoyens.
 */
export const signalementCitoyenFiltersClient = {
	filter: {
		titre: parseAsString.withDefault(''),
		categorieId: parseAsString.withDefault(''),
		statut: parseAsString.withDefault(''),
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(20),
	},
	option: {
		clearOnDefault: true,
		throttleMs: 500,
	}
};

export const signalementCategorieFiltersClient = {
	filter: {
		nom: parseAsString.withDefault(''),
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(20),
	},
	option: {
		clearOnDefault: true,
		throttleMs: 500,
	}
};
