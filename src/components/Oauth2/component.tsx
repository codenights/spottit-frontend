import React, { useEffect } from "react";
import { Redirect } from "react-router";

import { useLoggedIn } from "../../hooks/useLoggedIn";
import { useDependency } from "../../di";

export interface OAuth2Props {}

export const OAuth2: React.FC<OAuth2Props> = () => {
  const isLoggedIn = useLoggedIn();
  const authService = useDependency("authService");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      throw new Error("Invalid auth redirect URI");
    }

    authService.login(accessToken, refreshToken);
  }, [authService]);

  return isLoggedIn ? <Redirect to="/" /> : null;
};
