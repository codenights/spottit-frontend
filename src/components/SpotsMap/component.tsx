import React, { useState, useEffect } from "react";
import { Route } from "react-router";

import { Location } from "../../domain/model/Location";

import { useLocation } from "../../hooks/useLocation";
import { SpotDetails } from "../SpotDetails";
import { Map } from "./Map";
import { Wrapper, DetailsSection } from "./styles";
import { useSpots } from "./hooks";

export interface SpotsMapProps {}

export const SpotsMap: React.FC<SpotsMapProps> = () => {
  const [center, setCenter] = useState<Location | null>(null);
  const location = useLocation();
  const spots = useSpots(center);

  useEffect(() => {
    // Set the initial map center
    if (center) {
      return;
    }

    setCenter(location);
  }, [location, center]);

  if (!location || !center) {
    return <div>Acquiring location...</div>;
  }

  return (
    <Wrapper>
      <Map
        center={center}
        onCenterChange={setCenter}
        spots={spots}
        userPosition={location}
      />

      <Route
        exact
        path="/s/:spotId"
        render={({ match }) => (
          <DetailsSection>
            <SpotDetails spotId={match.params.spotId} />
          </DetailsSection>
        )}
      />
    </Wrapper>
  );
};
