import {parseAsString, parseAsInteger, parseAsBoolean} from 'nuqs';

/**
 * @constant actualiteFiltersClient
 * @description Définit les schémas de parsing pour les paramètres de requête d'URL
 * utilisés pour filtrer et paginer la liste des actualités.
 * Chaque propriété correspond à un paramètre d'URL et spécifie son type
 * et sa valeur par défaut.
 */
export const actualiteFiltersClient = {
	filter: {
		search: parseAsString.withDefault(''),
		dateFrom: parseAsString.withDefault(''),
		dateTo: parseAsString.withDefault(''),
		hasImage: parseAsBoolean.withDefault(null as any),
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(10),
	},
	option: {
		clearOnDefault: true,
		throttleMs: 500, // 500ms de délai pour les filtres textuels
	}
};