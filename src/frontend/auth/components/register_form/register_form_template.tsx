import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PasswordChecker } from "../password_checker/password_checker";
import "./register_form.scss";

import {
  RegisterFormProps,
  RegisterFormState,
  RegisterFormController,
} from "./register_form_interface";

export function template(
  this: RegisterFormController,
  props: RegisterFormProps,
  state: RegisterFormState
) {
  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Floating className={"mb-3"}>
        <Form.Control
          type='text'
          id='username'
          name='username'
          placeholder='Username'
          pattern='[a-zA-Z0-9_\-]*'
          title='Username can only contain Alphanumeric Characters. Dashes and Underscores are allowed.'
          required
        />
        <Form.Label htmlFor='username'>Username</Form.Label>
      </Form.Floating>
      <Form.Floating className={"mb-3"}>
        <Form.Control
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          value={state.password ?? ""}
          onChange={this.handlePasswordChange}
          required
        />
        <Form.Label htmlFor='password'>Password</Form.Label>
        {state.password && (
          <PasswordChecker password={state.password} className='mb-3' />
        )}
      </Form.Floating>
      <Form.Floating className='mb-3'>
        <Form.Control
          type='email'
          id='email'
          name='email'
          placeholder='E-mail Address'
          required
        />
        <Form.Label htmlFor='email'>E-mail Address</Form.Label>
      </Form.Floating>
      <Form.Floating className={"mb-3"}>
        <Form.Control
          type='text'
          id='captcha'
          placeholder={`What is ${this.captchaNumber.one} + ${this.captchaNumber.two}`}
          value={state.captcha ?? ""}
          onChange={this.handleCaptchaChange}
          required
        />
        <Form.Label htmlFor='captcha'>{`What is ${this.captchaNumber.one} + ${this.captchaNumber.two}`}</Form.Label>
      </Form.Floating>
      <div className='d-grid'>
        <Button
          variant='success'
          type='submit'
          className='text-uppercase fw-bold'
        >
          Register!
        </Button>
      </div>
    </Form>
  );
}
