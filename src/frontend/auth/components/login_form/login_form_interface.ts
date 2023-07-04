import { FormEvent } from "react";

export interface LoginFormProps {
  onError?: (error: string) => void;
}

export interface LoginFormState {}

export interface LoginFormController {
  handleSubmit: (event: FormEvent) => void;
}
