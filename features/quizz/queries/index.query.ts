import { useQueryClient } from '@tanstack/react-query';

// 1- Clé de cache
export const quizzKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['quizz'];
    }
    return ['quizz', ...params];
};

// 2. Hook personnalisé pour l'invalidation
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