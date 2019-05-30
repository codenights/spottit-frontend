import React from "react";

import { SpotDetails } from "./component";
import { RouteComponentProps } from "react-router";

export type SpotDetailsRouterProps = RouteComponentProps<{ spotId: string }>;

const SpotDetailsRouter: React.FC<SpotDetailsRouterProps> = ({ match }) => {
  return <SpotDetails spotId={match.params.spotId} />;
};

export default SpotDetailsRouter;
