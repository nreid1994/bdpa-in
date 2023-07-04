export enum AlertType {
  ERROR,
  WARNING,
  SUCCESS,
}

export interface AlertProps {
  message: string;
  type: AlertType;

  icon?: string;
}

export interface AlertState {}

export interface AlertController {}
