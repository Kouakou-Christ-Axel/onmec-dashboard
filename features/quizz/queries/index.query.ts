import { useQueryClient } from '@tanstack/react-query';

// 1- Clé de cache des quizz
export const quizzKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['quizz'];
    }
    return ['quizz', ...params];
};

// 1bis- Clé de cache des catégories de quizz
export const categorieQuizzKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['categorie-quizz'];
    }
    return ['categorie-quizz', ...params];
};

// 2. Hook personnalisé pour l'invalidation des quizz
export const useInvalidateQuizzQuery = () => {
    const queryClient = useQueryClient();

    return async (...params: any[]) => {
        await queryClient.invalidateQueries({
            queryKey: quizzKeyQuery(...params),
            exact: false
        });

        await queryClient.refetchQueries({
            queryKey: quizzKeyQuery(),
            type: 'active'
        });
    };
};

// 3. Hook personnalisé pour l'invalidation des catégories de quizz
export const useInvalidateCategorieQuizzQuery = () => {
    const queryClient = useQueryClient();

    return async (...params: any[]) => {
        await queryClient.invalidateQueries({
            queryKey: categorieQuizzKeyQuery(...params),
            exact: false
        });

        await queryClient.refetchQueries({
            queryKey: categorieQuizzKeyQuery(),
            type: 'active'
        });
    };
};