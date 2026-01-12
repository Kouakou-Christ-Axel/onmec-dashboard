export enum UtilisateurRole {
  AGENT = "AGENT",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type PermissionAction = "read" | "create" | "update" | "delete";

export interface IUtilisateurPermissions {
  modules: {
    all: PermissionAction[];
    // Ajoutez d'autres modules si nécessaire, ex.:
    // users?: PermissionAction[];
    // reports?: PermissionAction[];
  };
}

export enum UtilisateurStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface IUtilisateur {
  id: string;
  email: string;
  fullname: string;
  phone: string | null;
  role: UtilisateurRole | "MEMBER";
  permissions: IUtilisateurPermissions;
}

export interface IUtilisateursParams {
  status?: UtilisateurStatus;
  role?: UtilisateurRole;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  page?: number;
  limit?: number;
}

export interface IUtilisateurAddUpdateResponse extends Pick<IUtilisateur, 'fullname' | 'email' | 'phone' | 'role' > {
  generatedPassword: string
}

export interface IUtilisateurDeleteResponse {
  success: true,
  message: string,
};