"use client";

import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, X } from "lucide-react";
import { verrouillerUtilisateurAction } from "../actions/utilisateur.action";
import { useInvalidateUtilisateurQuery } from "./index.query";

export const useVerrouillerUtilisateurMutation = () => {
    const invalidateUtilisateurQuery = useInvalidateUtilisateurQuery();
    return useMutation({
        mutationFn: async ({ id, locked }: { id: string; locked: boolean }) => {
            if (!id) {
                throw new Error("L'identifiant de l'utilisateur est requis.");
            }
            const result = await verrouillerUtilisateurAction(id, locked);
            if (!result.success) {
                throw new Error(result.error || "Erreur lors du changement d'état de l'utilisateur");
            }
            return result.data!;
        },
        onSuccess: async (_data, variables) => {
            addToast({
                title: variables.locked
                    ? "Utilisateur verrouillé avec succès"
                    : "Utilisateur déverrouillé avec succès",
                description: variables.locked
                    ? "Le compte a été désactivé."
                    : "Le compte a été réactivé.",
                promise: invalidateUtilisateurQuery(),
                icon: <CheckCircle2 />,
                color: "success",
            });
        },
        onError: async (error) => {
            addToast({
                title: "Erreur changement d'état utilisateur:",
                description: error.message,
                promise: Promise.reject(error),
                icon: <X />,
                color: "danger",
            });
        },
    });
};
