import React, { useState, useEffect } from "react";
import { stringify } from "querystring";

import { Location } from "../../domain/model/Location";

import { useLocation } from "../../hooks/useLocation";
import { useHistory } from "../../hooks/useHistory";
import { Map } from "../../ui/Map";

import { Wrapper } from "./styles";
import { useSpots } from "./hooks";

export interface SpotsMapProps {}

export const SpotsMap: React.FC<SpotsMapProps> = () => {
  const [zoomLevel, setZoomLevel] = useState(16);
  const [center, setCenter] = useState<Location | null>(null);
  const location = useLocation();
  const spots = useSpots(center);
  const history = useHistory();

  useEffect(() => {
    // Set the initial map center
    if (center) {
      return;
    }

    setCenter(location);
  }, [location, center]);

  const onSelectLocation = (location: Location) => {
    const params = stringify({
      latitude: location.latitude,
      longitude: location.longitude
    });

    history.push(`/s/new?${params}`);
  };

  return (
    <Wrapper>
      {!location || !center ? (
        <div>Acquiring location...</div>
      ) : (
        <Map
          isFixed={false}
          zoomLevel={zoomLevel}
          onZoomLevelChange={setZoomLevel}
          center={center}
          onCenterChange={setCenter}
          markers={spots.map(spot => ({
            id: spot.id,
            position: spot.location,
            onClick: () => history.push(`/s/${spot.id}`)
          }))}
          currentPosition={location}
          onSelectLocation={onSelectLocation}
        />
      )}
    </Wrapper>
  );
};
