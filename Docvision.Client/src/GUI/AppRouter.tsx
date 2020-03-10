import React, { FunctionComponent } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MainPageContainer from "./mainPage/MainPageContainer";
import NotFountPage from "./notFoundPage/NotFoundPage";

const AppRouter: FunctionComponent = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/:buildingId?/:roomId?"
            component={MainPageContainer}
          />
          <Route component={NotFountPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
