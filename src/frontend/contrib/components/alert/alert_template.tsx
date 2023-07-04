import React from "react";
import {
  AlertController,
  AlertProps,
  AlertState,
  AlertType,
} from "./alert_interface";

const TYPE_TO_CLASS = new Map([
  [AlertType.ERROR, "error"],
  [AlertType.SUCCESS, "success"],
  [AlertType.WARNING, "warning"],
]);

export function template(
  this: AlertController,
  props: AlertProps,
  state: AlertState
) {
  const alertClass = `alert alert-${
    TYPE_TO_CLASS.get(props.type) ?? "primary"
  } alert-dimissable fade show`;
  return (
    <div className={alertClass} role='alert'>
      {props.icon && <i className={props.icon}></i>}
      {props.message}
      <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-label='Close'
      ></button>
    </div>
  );
}
