export class Alert {
  type: AlertType;
  message: string;
  timeout: number;
  state: AlertState;

  constructor(type: AlertType, message: string, timeout: number, state: AlertState) {
    this.type = type;
    this.message = message;
    this.timeout = timeout;
    this.state = state;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}

export enum AlertState {
  Opening,
  Closing
}
