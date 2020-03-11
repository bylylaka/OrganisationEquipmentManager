import Axios, { AxiosError, AxiosResponse } from "axios";
import { Store } from "redux";
import Actions from "./logic/actions/actions";
import { AppSnackbarMessage } from "./GUI/shared/AppSnackbar/props";

export default class HttpInterceptor {
  public static initInterceptors(store: Store) {
    Axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        store.dispatch(
          Actions.setAppSnackbarMessage(
            new AppSnackbarMessage(
              "Произошла ошибка. Пожалуйста, повторите попытку.",
              "error"
            )
          )
        );
        return Promise.reject(error);
      }
    );
  }
}
