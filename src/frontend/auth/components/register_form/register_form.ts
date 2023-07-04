import { ChangeEvent, Component, FormEvent } from "react";
import { sanitize } from "isomorphic-dompurify";
import { template } from "./register_form_template";
import { UserService, UserType } from "../../../contrib/services/user_service";

import {
  RegisterFormProps,
  RegisterFormController,
  RegisterFormState,
} from "./register_form_interface";

export class RegisterForm
  extends Component<RegisterFormProps, RegisterFormState>
  implements RegisterFormController
{
  private readonly userService = UserService.getInstance();
  readonly captchaNumber: { one: number; two: number };
  render = () => template.call(this, this.props, this.state);

  constructor(props: RegisterFormProps) {
    super(props);
    this.state = { disabled: true };
    this.captchaNumber = {
      one: Math.floor(Math.random() * 10),
      two: Math.floor(Math.random() * 10),
    };
  }

  readonly handleCaptchaChange = (event: ChangeEvent) => {
    const value = sanitize((event.target as HTMLInputElement).value);
    const answer = parseInt(value, 10);

    if (isNaN(answer)) {
      this.setState({ disabled: true, captcha: value });
      return;
    }

    this.setState({
      captcha: value,
      disabled:
        answer === this.captchaNumber.one + this.captchaNumber.two
          ? false
          : true,
    });
  };

  readonly handlePasswordChange = (event: ChangeEvent) => {
    const password = sanitize((event.target as HTMLInputElement).value);
    this.setState({ password });
  };

  readonly handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const username = sanitize(formData.get("username")?.toString() ?? "");
    const email = sanitize(formData.get("email")?.toString() ?? "");
    const password = sanitize(formData.get("password")?.toString() ?? "");

    const response = await window.fetch(
      "http://localhost/bdpa-in/src/backend/auth/register.php",
      {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          email,
          type: UserType.INNER,
        }),
      }
    );

    const data = await response.json();
    if (data?.error) {
      this.props.onError?.(data.error);
      return;
    }

    const dataUser = data.user;

    const user = {
      userId: dataUser.user_id,
      username: dataUser.username,
      email: dataUser.email,
      type: dataUser.type,
      views: dataUser.views,
    };
    this.userService.setUser(user);
    // Navigate to Profile.
  };
}
