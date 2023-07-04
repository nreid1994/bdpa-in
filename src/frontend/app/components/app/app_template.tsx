import React from "react";
import "./app.scss";
import { AppProps, AppState, AppController } from "./app_interface";
import { Auth } from "../../../auth/components/auth/auth";

export function template(
  this: AppController,
  props: AppProps,
  state: AppState
) {
  return <Auth />;
}
