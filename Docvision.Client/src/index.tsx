import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import Axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Reducer from "./logic/reducers/reducer";
import AppSnackbarContainer from "./shared/AppSnackbar/AppSnackbarContainer";
import createSagaMiddleware from "redux-saga";
import SagasRunner from "./logic/sagas/sagasRunner";

const sagaMiddleware = createSagaMiddleware();
const mainStore = createStore(Reducer, applyMiddleware(sagaMiddleware));
SagasRunner.run(sagaMiddleware);

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
