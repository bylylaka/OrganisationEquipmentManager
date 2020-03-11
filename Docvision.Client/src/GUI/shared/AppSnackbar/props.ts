import { v1 as uuid } from "uuid";

export type IAppSnackbarMessageType = "error" | "info" | "success";

export class AppSnackbarMessage {
  constructor(message: string, type: IAppSnackbarMessageType) {
    this.message = message;
    this.type = type;
    this.uuid = uuid();
  }
  public message: string;
  public type: IAppSnackbarMessageType;
  private uuid: string;
}

export interface IAppSnackbarProps {
  message: AppSnackbarMessage;
}
