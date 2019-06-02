import React, { useState, useEffect, useRef } from "react";
import { stringify } from "querystring";

import { Location } from "../../domain/model/Location";

import { useLocation } from "../../hooks/useLocation";
import { useHistory } from "../../hooks/useHistory";
import { Map } from "../../ui/Map";

import { Wrapper, SpotsList, SpotItem, Pusher } from "./styles";
import { LoadingAnimation } from "./LoadingAnimation";
import { useSpots, useAnimations } from "./hooks";

export interface SpotsMapProps {}

export const SpotsMap: React.FC<SpotsMapProps> = () => {
  const [zoomLevel, setZoomLevel] = useState(16);
  const [center, setCenter] = useState<Location | null>(null);
  const location = useLocation();
  const spots = useSpots(center);
  const history = useHistory();
  const listRef = useRef<HTMLUListElement | null>(null);
  const animations = useAnimations();

  useEffect(() => {
    // Set the initial map center
    if (center) {
      return;
    }

    setCenter(location);
  }, [location, center]);

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollLeft = 0;
  }, [spots]);

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
        <LoadingAnimation />
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
      <SpotsList style={animations.spotsList} ref={listRef}>
        {spots.map(spot => (
          <li key={spot.id}>
            <SpotItem onClick={() => setCenter(spot.location)}>
              <p>{spot.name}</p>
              <p>{spot.location.address}</p>
            </SpotItem>
          </li>
        ))}
        <Pusher />
      </SpotsList>
    </Wrapper>
  );
};
