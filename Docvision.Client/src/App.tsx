import React, { FunctionComponent } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Axios from "axios";
import MenuContainer from "./menu/MenuContainer";

const App: FunctionComponent = () => {
  // Axios.get(`${Axios.defaults.baseURL}/organisation`).then(res => {
  //   console.log(res);
  // });

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/:buildingId?/:roomId?"
            component={MenuContainer}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
