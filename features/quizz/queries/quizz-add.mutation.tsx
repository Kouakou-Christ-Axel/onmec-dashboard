import { useMutation } from "@tanstack/react-query"
import { useInvalidateQuizzQuery } from "./index.query"
import { QuizzCreateDTO, QuizzSchema } from "../schema/quizz.schema"
import { processAndValidateFormData } from "ak-zod-form-kit"
import { ajouterQuizzAction } from "../actions/quizz.actions"
import { addToast } from "@heroui/toast"
import { CheckCircle2, X } from "lucide-react"

export const useAjouterQuizzMutation = () => {
    const invalidateQuizzQuery = useInvalidateQuizzQuery()

    return useMutation({
        mutationFn: async ({ data }: { data: QuizzCreateDTO }) => {
            // Validation des données
            const validation = processAndValidateFormData(QuizzSchema, data,
                {
                    outputFormat: "formData",
                })

            if (!validation.success) {
                throw new Error(validation.errorsInString || "Une erreur est survenue lors de la validation des données.");
            }

            // Appel de l'API avec l'action
            const result = await ajouterQuizzAction(validation.data as QuizzCreateDTO);

            if (!result.success) {
                throw new Error(result.error || "Erreur lors de l'ajout du quizz");
            }

            return result.data!;
        },
        onSuccess: async () => {
            addToast({
                title: "Quizz ajouté avec succès",
                description: "Quizz ajouté avec succès",
                promise: invalidateQuizzQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },

        onError: async (error) => {
            console.log("error query", error)
            addToast({
                title: "Erreur lors de l'ajout du quizz:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
}