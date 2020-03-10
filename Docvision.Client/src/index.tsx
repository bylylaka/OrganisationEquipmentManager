import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import Axios from "axios";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducer from "./reducers/reducer";
import AppSnackbarContainer from "./shared/AppSnackbar/AppSnackbarContainer";

const mainStore = createStore(Reducer);

const Main: FunctionComponent = () => {
  Axios.defaults.baseURL = "http://localhost:55586/api";

  return (
    <Provider store={mainStore}>
      <AppRouter />
      <AppSnackbarContainer />
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
