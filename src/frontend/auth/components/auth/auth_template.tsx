import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import "./auth.scss";
import {
  AuthProps,
  AuthState,
  AuthController,
  AuthType,
} from "./auth_interface";
import { LoginForm } from "../login_form/login_form";
import { RegisterForm } from "../register_form/register_form";

export function template(
  this: AuthController,
  props: AuthProps,
  state: AuthState
) {
  return (
    <Container as='main' className='auth'>
      <Row className='d-flex align-items-center justify-content-center vh-100'>
        <Col sm={9} md={7} lg={5} mx={"auto"}>
          {state.errorMessage && (
            <Alert variant='danger' onClose={this.handleAlertClose} dismissible>
              <Alert.Heading>Oh No! You Got An Error! 😭</Alert.Heading>
              <p>{state.errorMessage}</p>
            </Alert>
          )}
          <Card className='shadow rounded-3 my-5'>
            <Card.Body className='p-4 p-sm-5'>
              <Card.Title as={"h5"} className='text-center mb-5 fw-light fs-5'>
                {state.type}
              </Card.Title>
              {state.type === AuthType.LOGIN ? (
                <LoginForm onError={this.onError} />
              ) : (
                <RegisterForm onError={this.onError} />
              )}
              <hr className='my-4'></hr>
              <div className='d-grid'>
                <Button
                  variant='primary'
                  className='text-uppercase fw-bold'
                  onClick={this.handleButtonClick}
                >
                  {state.type === AuthType.REGISTER ? "Sign In!" : "Sign Up!"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
