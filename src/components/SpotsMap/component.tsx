import React, { useState, useEffect } from "react";
import { Route } from "react-router";

import { Location } from "../../domain/model/Location";
import { Spot } from "../../domain/model/Spot";
import { searchSpots } from "../../domain/usecase/search-spots";
import { useLocation } from "../../hooks/useLocation";

import { SpotDetails } from "../SpotDetails";
import { Map } from "./Map";
import { Wrapper, DetailsSection } from "./styles";

interface SpotsResults {
  type: "idle" | "loading" | "ready";
  spots: Spot[];
}

export interface SpotsMapProps {}

export const SpotsMap: React.FC<SpotsMapProps> = () => {
  const [results, setResults] = useState<SpotsResults>({
    type: "idle",
    spots: []
  });
  const [center, setCenter] = useState<Location | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Set the initial map center
    if (center) {
      return;
    }

    setCenter(location);
  }, [location, center]);

  useEffect(() => {
    // Refetch results when the center changes
    if (!center) {
      return;
    }

    setResults({
      type: "loading",
      spots: results.spots
    });

    searchSpots(center).then(spots =>
      setResults({
        type: "ready",
        spots
      })
    );
  }, [center, results.spots]);

  if (!location || !center) {
    return <div>Acquiring location...</div>;
  }

  return (
    <Wrapper>
      <Map
        center={center}
        onCenterChange={setCenter}
        spots={results.spots}
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
