import { useQueryClient } from "@tanstack/react-query";

// 1- Clé de cache
export const commentaireKeyQuery = (...params: any[]) => {
  if (params.length === 0) {
    return ["commentaire"];
  }
  return ["commentaire", ...params];
};

// 2. Hook personnalisé pour l'invalidation
export const useInvalidateCommentaireQuery = () => {
  const queryClient = useQueryClient();

  return async (...params: any[]) => {
    await queryClient.invalidateQueries({
      queryKey: commentaireKeyQuery(...params),
      exact: false,
    });

    await queryClient.refetchQueries({
      queryKey: commentaireKeyQuery(),
      type: "active",
    });
  };
};
