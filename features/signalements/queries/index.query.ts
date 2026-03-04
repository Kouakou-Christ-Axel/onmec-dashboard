import { useQueryClient } from '@tanstack/react-query';

// 1- Clés de cache pour signalements
export const signalementKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['signalement'];
    }
    return ['signalement', ...params];
};

// 1bis- Clés de cache pour catégories
export const categorieKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['categorie-signalement'];
    }
    return ['categorie-signalement', ...params];
};

// 2. Hook personnalisé pour l'invalidation des signalements
export const useInvalidateSignalementQuery = () => {
    const queryClient = useQueryClient();

    return async (...params: any[]) => {
        await queryClient.invalidateQueries({
            queryKey: signalementKeyQuery(...params),
            exact: false
        });

        await queryClient.refetchQueries({
            queryKey: signalementKeyQuery(),
            type: 'active'
        });
    };
};

// 3. Hook personnalisé pour l'invalidation des catégories
export const useInvalidateCategorieQuery = () => {
    const queryClient = useQueryClient();

    return async (...params: any[]) => {
        await queryClient.invalidateQueries({
            queryKey: categorieKeyQuery(...params),
            exact: false
        });

        await queryClient.refetchQueries({
            queryKey: categorieKeyQuery(),
            type: 'active'
        });
    };
};

