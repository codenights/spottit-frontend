import React from "react";

import { OAuth2 } from "./component";

export interface Oauth2RouterProps {}

const Oauth2Router: React.FC<Oauth2RouterProps> = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    throw new Error("Invalid auth redirect URI");
  }

  return <OAuth2 accessToken={accessToken} refreshToken={refreshToken} />;
};

export default Oauth2Router;
