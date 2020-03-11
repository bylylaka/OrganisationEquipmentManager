import React, { FunctionComponent, useEffect } from "react";
import ReactDOM from "react-dom";
import AppRouter from "./GUI/AppRouter";
import Axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Reducer from "./logic/reducers/reducer";
import AppSnackbarContainer from "./GUI/shared/AppSnackbar/AppSnackbarContainer";
import createSagaMiddleware from "redux-saga";
import SagasRunner from "./logic/sagas/sagasRunner";
import HttpInterceptor from "./HttpInterceptor";

const sagaMiddleware = createSagaMiddleware();
const mainStore = createStore(Reducer, applyMiddleware(sagaMiddleware));
SagasRunner.run(sagaMiddleware);

Axios.defaults.baseURL = "http://localhost:55586/api";
HttpInterceptor.initInterceptors(mainStore);

const Main: FunctionComponent = () => {
  return (
    <Provider store={mainStore}>
      <AppRouter />
      <AppSnackbarContainer />
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
