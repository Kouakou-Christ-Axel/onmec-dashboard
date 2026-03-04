// Index exports
// Queries - Signalements
export { useSignalementsListQuery, prefetchSignalementsListQuery, signalementsListQueryOption } from './signalement/signalement-list.query';
export { useSignalementQuery, prefetchSignalementQuery, signalementQueryOption } from './signalement/signalement-detail.query';

// Mutations - Signalements
export { useAjouterSignalementMutation } from './signalement/signalement-add.mutation';
export { useModifierSignalementMutation } from './signalement/signalement-update.mutation';
export { useSupprimerSignalementMutation } from './signalement/signalement-delete.mutation';

// Queries - Catégories
export { useCategoriesListQuery, prefetchCategoriesListQuery, categoriesListQueryOption } from './categorie/categorie-list.query';

// Mutations - Catégories
export { useAjouterCategorieMutation } from './categorie/categorie-add.mutation';
export { useModifierCategorieMutation } from './categorie/categorie-update.mutation';
export { useSupprimerCategorieMutation } from './categorie/categorie-delete.mutation';

// Index queries
export { signalementKeyQuery, categorieKeyQuery, useInvalidateSignalementQuery, useInvalidateCategorieQuery } from './index.query';
