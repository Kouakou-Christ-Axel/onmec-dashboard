import { useMutation } from "@tanstack/react-query"
import { useInvalidateQuizzQuery } from "./index.query"
import { supprimerQuizzAction } from "../actions/quizz.actions"
import { addToast } from "@heroui/toast"
import { CheckCircle2, X } from "lucide-react"

export const useSupprimerQuizzMutation = () => {
    const invalidateQuizzQuery = useInvalidateQuizzQuery()

    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            if (!id) {
                throw new Error("L'identifiant du quizz est requis.");
            }

            const result = await supprimerQuizzAction(id);

            if (!result.success) {
                throw new Error(result.error || "Erreur lors de la suppression du quizz");
            }

            return result.data;
        },
        onSuccess: async () => {
            addToast({
                title: "Quizz supprimé avec succès",
                description: "Le quizz a été supprimé",
                promise: invalidateQuizzQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },

        onError: async (error) => {
            addToast({
                title: "Erreur lors de la suppression du quizz:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
}
