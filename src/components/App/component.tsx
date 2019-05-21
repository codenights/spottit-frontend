import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import { useHistory } from "../../hooks/useHistory";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { Theme } from "../../ui/Theme";
import { SpotsMap } from "../SpotsMap";
import { AppBar } from "../AppBar";
import { OAuth2 } from "../Oauth2";
import { NewSpot } from "../NewSpot";
import { SpotDetails } from "../SpotDetails";

import { ContentWrapper, ModalOnDesktopWrapper, ModalContent } from "./styles";

export interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const history = useHistory();
  const isLoggedIn = useLoggedIn();

  return (
    <Theme>
      <Router history={history}>
        <AppBar />
        <ContentWrapper>
          <Switch>
            <Route
              path="/oauth2/callback"
              exact
              render={() => {
                const searchParams = new URLSearchParams(
                  window.location.search
                );
                const accessToken = searchParams.get("accessToken");
                const refreshToken = searchParams.get("refreshToken");

                if (!accessToken || !refreshToken) {
                  throw new Error("Invalid auth redirect URI");
                }

                return (
                  <OAuth2
                    accessToken={accessToken}
                    refreshToken={refreshToken}
                  />
                );
              }}
            />
            <Route path="/s" render={() => <SpotsMap />} />
            <Redirect to="/s" />
          </Switch>

          {isLoggedIn && (
            <Switch>
              <Route
                exact
                path="/s/new"
                render={() => {
                  const searchParams = new URLSearchParams(
                    window.location.search
                  );
                  const latitudeStr = searchParams.get("latitude");
                  const longitudeStr = searchParams.get("longitude");

                  if (!latitudeStr || !longitudeStr) {
                    throw new Error("Missing required location.");
                  }

                  return (
                    <ModalOnDesktopWrapper>
                      <ModalContent>
                        <NewSpot
                          longitude={Number(longitudeStr)}
                          latitude={Number(latitudeStr)}
                        />
                      </ModalContent>
                    </ModalOnDesktopWrapper>
                  );
                }}
              />

              <Route
                exact
                path="/s/:spotId"
                render={({ match }) => (
                  <ModalOnDesktopWrapper>
                    <ModalContent>
                      <SpotDetails spotId={match.params.spotId} />
                    </ModalContent>
                  </ModalOnDesktopWrapper>
                )}
              />
            </Switch>
          )}
        </ContentWrapper>
      </Router>
    </Theme>
  );
};
