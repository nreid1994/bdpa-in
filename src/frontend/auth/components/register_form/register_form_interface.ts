import { FormEvent, ChangeEvent } from "react";

export interface RegisterFormProps {
  onError?: (error: string) => void;
}

export interface RegisterFormState {
  disabled: boolean;

  captcha?: string;
  password?: string;
}

export interface RegisterFormController {
  captchaNumber: {
    one: number;
    two: number;
  };

  handleCaptchaChange: (event: ChangeEvent) => void;
  handlePasswordChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
}
