import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login_form.scss";

import {
  LoginFormProps,
  LoginFormState,
  LoginFormController,
} from "./login_form_interface";

export function template(
  this: LoginFormController,
  props: LoginFormProps,
  state: LoginFormState
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
          required
        />
        <Form.Label htmlFor='password'>Password</Form.Label>
      </Form.Floating>
      <Form.Floating className={"mb-3"}>
        <Form.Check
          type={"checkbox"}
          id='rememberMe'
          name='rememberMe'
          value='true'
          label='Remember Me?'
        />
      </Form.Floating>
      <div className='d-grid'>
        <Button
          variant='success'
          type='submit'
          className='text-uppercase fw-bold'
        >
          Login!
        </Button>
      </div>
    </Form>
  );
}
