import { v1 as uuid } from "uuid";

export class AppSnackbarMessage {
  constructor(message: string) {
    this.message = message;
    this.uuid = uuid();
  }
  message: string;
  uuid: string;
}

export interface IAppSnackbarProps {
  message: AppSnackbarMessage;
}
