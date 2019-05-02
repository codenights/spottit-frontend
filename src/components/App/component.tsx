import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import { history } from "../../helpers/history";
import { Theme } from "../../ui/Theme";
import { SpotsMap } from "../SpotsMap";

export interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <Theme>
    <Router history={history}>
      <Switch>
        <Route path="/s" render={() => <SpotsMap />} />
        <Redirect to="/s" />
      </Switch>
    </Router>
  </Theme>
);
