import { parseAsInteger, parseAsStringEnum } from "nuqs";
import { CibleType } from "../types/commentaire.types";

/**
 * @constant commentaireFiltersClient
 * @description Définit les schémas de parsing pour les paramètres de requête d'URL
 * utilisés pour filtrer et paginer la liste des commentaires de modération.
 */
export const commentaireFiltersClient = {
  filter: {
    cible: parseAsStringEnum<CibleType>([
      "signalement",
      "actualite",
    ]).withDefault("signalement"),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(20),
  },
  option: {
    clearOnDefault: true,
    throttleMs: 500,
  },
};
