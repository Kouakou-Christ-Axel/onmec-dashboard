import { UtilisateurRole } from "../types/utilisateur.type";


export function getUtilisateurRole(role: UtilisateurRole): {
    label: string;
    color: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined;
} {
    switch (role) {
        case UtilisateurRole.ADMIN:
            return {
                label: "Administrateur",
                color: "success",
            };
        case UtilisateurRole.MEMBER:
            return {
                label: "Membre",
                color: "primary",
            };
        default:
            return {
                label: "Inconnu",
                color: "default",
            };
    }
}
