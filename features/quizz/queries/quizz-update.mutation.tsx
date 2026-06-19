import { useMutation } from "@tanstack/react-query"
import { useInvalidateQuizzQuery } from "./index.query"
import { QuizzCreateDTO, QuizzSchema } from "../schema/quizz.schema"
import { processAndValidateFormData } from "ak-zod-form-kit"
import { modifierQuizzAction } from "../actions/quizz.actions"
import { addToast } from "@heroui/toast"
import { CheckCircle2, X } from "lucide-react"

export const useModifierQuizzMutation = () => {
    const invalidateQuizzQuery = useInvalidateQuizzQuery()

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: QuizzCreateDTO }) => {
            if (!id) {
                throw new Error("L'identifiant du quizz est requis.");
            }

            const validation = processAndValidateFormData(QuizzSchema, data, {
                outputFormat: "object",
            })

            if (!validation.success) {
                throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
            }

            const result = await modifierQuizzAction(id, validation.data as QuizzCreateDTO);

            if (!result.success) {
                throw new Error(result.error || "Erreur lors de la modification du quizz");
            }

            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Quizz modifié avec succès",
                description: "Le quizz a été mis à jour",
                promise: invalidateQuizzQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },

        onError: async (error) => {
            addToast({
                title: "Erreur lors de la modification du quizz:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
}
