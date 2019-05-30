import React from "react";
import { RouteComponentProps } from "react-router";

import { SpotDetails } from "./component";
import { useSpot } from "./hooks";

export type SpotDetailsRouterProps = RouteComponentProps<{ spotId: string }>;

const SpotDetailsRouter: React.FC<SpotDetailsRouterProps> = ({ match }) => {
  const spot = useSpot(match.params.spotId);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return <SpotDetails spot={spot} />;
};

export default SpotDetailsRouter;
