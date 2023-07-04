import React, { Component } from "react";
import { template } from "./app_template";
import { AppProps, AppController, AppState } from "./app_interface";

export class App
  extends Component<AppProps, AppState>
  implements AppController
{
  render = template.bind(this, this.props, this.state);

  constructor(props: AppProps) {
    super(props);
  }
}
