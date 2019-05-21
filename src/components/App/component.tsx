import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import { history } from "../../helpers/history";
import { Theme } from "../../ui/Theme";
import { SpotsMap } from "../SpotsMap";
import { AppBar } from "../AppBar";
import { OAuth2 } from "../Oauth2";

export interface AppProps {}

export const App: React.FC<AppProps> = () => (
  <Theme>
    <AppBar />
    <Router history={history}>
      <Switch>
        <Route path="/oauth2/callback" exact render={() => <OAuth2 />} />
        <Route path="/s" render={() => <SpotsMap />} />
        <Redirect to="/s" />
      </Switch>
    </Router>
  </Theme>
);
