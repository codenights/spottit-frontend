import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import { useHistory } from "../../hooks/useHistory";
import { Theme } from "../../ui/Theme";
import { SpotsMap } from "../SpotsMap";
import { AppBar } from "../AppBar";

const Oauth2Router = React.lazy(() => import("../Oauth2"));
const NewSpotRouter = React.lazy(() => import("../NewSpot"));
const SpotDetailsRouter = React.lazy(() => import("../SpotDetails"));

export interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const history = useHistory();

  return (
    <Theme>
      <Router history={history}>
        <React.Suspense fallback={null}>
          <AppBar />
          <Switch>
            <Route exact path="/oauth2/callback" component={Oauth2Router} />
            <Route exact path="/s" component={SpotsMap} />
            <Route exact path="/s/new" component={NewSpotRouter} />
            <Route exact path="/s/:spotId" component={SpotDetailsRouter} />
            <Redirect to="/s" />
          </Switch>
        </React.Suspense>
      </Router>
    </Theme>
  );
};
