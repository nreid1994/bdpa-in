import { MouseEvent, KeyboardEvent } from "react";

export enum AuthType {
  LOGIN = "Login",
  REGISTER = "Register",
}

export interface AuthProps {
  type?: AuthType;
}

export interface AuthState {
  type: AuthType;
  errorMessage?: string;
}

export interface AuthController {
  handleButtonClick: (event: MouseEvent | KeyboardEvent) => void;
  handleAlertClose: () => void;
  onError: (error: string) => void;
}
