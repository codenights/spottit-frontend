import React, { useEffect } from "react";
import { Redirect } from "react-router";

import { useLoggedIn } from "../../hooks/useLoggedIn";
import { useDependency } from "../../di";

export interface OAuth2Props {
  accessToken: string;
  refreshToken: string;
}

export const OAuth2: React.FC<OAuth2Props> = ({
  accessToken,
  refreshToken
}) => {
  const isLoggedIn = useLoggedIn();
  const authService = useDependency("authService");

  useEffect(() => {
    authService.login(accessToken, refreshToken);
  }, [authService, accessToken, refreshToken]);

  return isLoggedIn ? <Redirect to="/" /> : null;
};
