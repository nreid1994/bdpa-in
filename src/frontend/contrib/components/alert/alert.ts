import React, { Component } from "react";
import { template } from "./alert_template";
import { AlertController, AlertProps, AlertState } from "./alert_interface";

const ALERT_DISMISSAL_MILLISECONDS = 1000 * 5;

export class alert
  extends Component<AlertProps, AlertState>
  implements AlertController
{
  private timeout = -1;
  render = () => template.call(this, this.props, this.state);

  constructor(props: AlertProps) {
    super(props);
  }
}
