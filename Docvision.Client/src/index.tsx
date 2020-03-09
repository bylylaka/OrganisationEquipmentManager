import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./AppRouter";
import Axios from "axios";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reducer from "./reducers/reducer";

const Main: FunctionComponent = () => {
  Axios.defaults.baseURL = "http://localhost:55586/api";
  const mainStore = createStore(Reducer);

  return (
    <Provider store={mainStore}>
      <AppRouter />
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));
