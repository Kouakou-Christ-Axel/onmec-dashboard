import { IUtilisateur } from "@/features/utilisateur/types/utilisateur.type";

export interface ILoginResponse extends IUtilisateur {
  token: string;
  refreshToken: string;
}



export interface IRefreshTokenResponse {
  token: string;
}
