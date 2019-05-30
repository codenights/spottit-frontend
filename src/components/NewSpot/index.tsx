import React from "react";

import { NewSpot } from "./component";
import { useLoggedIn } from "../../hooks/useLoggedIn";
import { Redirect } from "react-router";

export interface NewSpotRouterProps {}

const NewSpotRouter: React.FC<NewSpotRouterProps> = () => {
  const isLoggedIn = useLoggedIn();

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const latitudeStr = searchParams.get("latitude");
  const longitudeStr = searchParams.get("longitude");

  if (!latitudeStr || !longitudeStr) {
    throw new Error("Missing required location.");
  }

  return (
    <NewSpot longitude={Number(longitudeStr)} latitude={Number(latitudeStr)} />
  );
};

export default NewSpotRouter;
