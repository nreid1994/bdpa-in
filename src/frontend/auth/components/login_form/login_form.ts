import { Component, FormEvent } from "react";
import { sanitize } from "isomorphic-dompurify";
import { template } from "./login_form_template";

import {
  LoginFormProps,
  LoginFormController,
  LoginFormState,
} from "./login_form_interface";
import { UserService } from "../../../contrib/services/user_service";

export class LoginForm
  extends Component<LoginFormProps, LoginFormState>
  implements LoginFormController
{
  private readonly userService = UserService.getInstance();
  render = () => template.call(this, this.props, this.state);

  constructor(props: LoginFormProps) {
    super(props);
  }

  readonly handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const getCanLogin = this.userService.canLogin();
    if (!getCanLogin.canLogin) {
      this.props.onError?.(
        `You are not permitted to login for ${getCanLogin.howLongToWaitInMinutes}`
      );
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const username = sanitize(formData.get("username")?.toString() ?? "");
    const password = sanitize(formData.get("password")?.toString() ?? "");
    const rememberMe = !!formData.get("rememberMe")?.toString();

    const response = await window.fetch(
      "http://localhost/bdpa-in/src/backend/auth/login.php",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    if (data?.error) {
      this.userService.failedLogin();
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
    this.userService.setUser(user, rememberMe);
    // navigate depending on type.
  };
}
