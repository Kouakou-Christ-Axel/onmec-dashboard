export enum UtilisateurRole {
	ADMIN = "ADMIN",
	MEMBER = "MEMBER",
}

export type PermissionAction = "read" | "create" | "update" | "delete";

export interface IUtilisateurPermissions {
	modules: {
		all: PermissionAction[];
	};
}

export enum UtilisateurStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
}

export interface IUtilisateur {
	id: string;
	email: string;
	fullname: string;
	phone: string | null;
	role: UtilisateurRole;
	/** Date de désactivation : non null => compte verrouillé */
	deletedAt?: string | null;
	createdAt?: string;
	updatedAt?: string;
	permissions?: IUtilisateurPermissions;
}

export interface IUtilisateursParams {
	search?: string;
	status?: UtilisateurStatus;
	role?: UtilisateurRole;
	page?: number;
	limit?: number;
}

export interface IUtilisateurAddUpdateResponse extends Pick<IUtilisateur, 'id' | 'fullname' | 'email' | 'phone' | 'role'> {
	/** Mot de passe généré renvoyé à la création */
	password?: string;
}

export interface IUtilisateurDeleteResponse {
	success: boolean;
	message: string;
}
