import React from "react";

import { Map } from "../../ui/Map";
import { useSpot } from "./hooks";
import { Wrapper, Markdown, Header, SpotInfo } from "./styles";

export interface SpotDetailsProps {
  spotId: string;
}

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spotId }) => {
  const spot = useSpot(spotId);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header>
        <Map
          isFixed={true}
          center={spot.location}
          zoomLevel={17}
          style={{ height: "250px" }}
        />
        <SpotInfo>
          <p>{spot.name}</p>
          {spot.location.address && <p>{spot.location.address}</p>}
        </SpotInfo>
      </Header>

      {spot.description && <Markdown source={spot.description} />}
    </Wrapper>
  );
};
