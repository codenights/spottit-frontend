import React from "react";

import { useDependency } from "../../di";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { Card } from "../../ui/Card";
import { ExternalLink, Button } from "../../ui/Button";

import { Wrapper } from "./styles";

export interface AppBarProps {}

export const AppBar: React.FC<AppBarProps> = () => {
  const apiUrl = useDependency("apiUrl");
  const authService = useDependency("authService");
  const isLoggedIn = useLoggedIn();

  const loginUrl = `${apiUrl}/authorize/google?redirect=${
    window.location.origin
  }/oauth2/callback`;

  return (
    <Wrapper>
      <Card>
        <div>Spottit</div>
        {isLoggedIn ? (
          <Button onClick={() => authService.logout()}>Logout</Button>
        ) : (
          <ExternalLink href={loginUrl}>Login</ExternalLink>
        )}
      </Card>
    </Wrapper>
  );
};
