import { parseAsString, parseAsInteger } from 'nuqs';

/**
 * @constant quizzFiltersClient
 * @description Schémas de parsing des paramètres d'URL utilisés pour filtrer
 * et paginer la liste des quizz (catégorie, difficulté, recherche).
 */
export const quizzFiltersClient = {
	filter: {
		search: parseAsString.withDefault(''),
		categorieId: parseAsString.withDefault(''),
		difficulte: parseAsString.withDefault(''),
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(10),
	},
	option: {
		clearOnDefault: true,
		throttleMs: 500,
	}
};
