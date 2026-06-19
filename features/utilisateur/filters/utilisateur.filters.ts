
import { parseAsString, parseAsInteger, parseAsStringEnum } from 'nuqs';
import { UtilisateurRole, UtilisateurStatus } from '@/features/utilisateur/types/utilisateur.type';
import { getEnumValues } from '@/utils/getEnumValues';

/**
 * @constant utilisateurFiltersClient
 * @description Définit les schémas de parsing pour les paramètres de requête d'URL
 * utilisés pour filtrer et paginer la liste des utilisateurs.
 */
export const utilisateurFiltersClient = {
    filter: {
        search: parseAsString.withDefault(''),
        status: parseAsStringEnum<UtilisateurStatus>(getEnumValues(UtilisateurStatus)),
        role: parseAsStringEnum<UtilisateurRole>(getEnumValues(UtilisateurRole)),
        page: parseAsInteger.withDefault(1),
        limit: parseAsInteger.withDefault(10),
    },
    option: {
        clearOnDefault: true,
        throttleMs: 500, // 500ms de délai pour les filtres textuels
    }
};
