import { useQueryClient } from '@tanstack/react-query';

// 1- Clé de cache
export const documentKeyQuery = (...params: any[]) => {
    if (params.length === 0) {
        return ['document'];
    }
    return ['document', ...params];
};

// 2. Hook personnalisé pour l'invalidation
export const useInvalidateDocumentQuery = () => {
    const queryClient = useQueryClient();

    return async (...params: any[]) => {
        await queryClient.invalidateQueries({
            queryKey: documentKeyQuery(...params),
            exact: false
        });

        await queryClient.refetchQueries({
            queryKey: documentKeyQuery(),
            type: 'active'
        });
    };
};