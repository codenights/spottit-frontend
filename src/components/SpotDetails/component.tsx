import React, { useRef } from "react";
import { useSpring, useChain, animated } from "react-spring";

import { Spot } from "../../domain/model/Spot";
import { Map } from "../../ui/Map";
import { useSpot } from "./hooks";
import { AuthoredBy, Wrapper, Markdown, Header, SpotInfo } from "./styles";

export interface SpotDetailsProps {
  spot: Spot;
}

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spot }) => {
  const mapAnimationRef = useRef<any>();
  const mapAnimation = useSpring({
    from: { opacity: 0, transform: "scale(1.2)" },
    opacity: 1,
    transform: "scale(1)",
    ref: mapAnimationRef
  });

  const headerAnimationRef = useRef<any>();
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-40px)" },
    opacity: 1,
    transform: "translateY(0)",
    ref: headerAnimationRef
  });

  const descriptionAnimationRef = useRef<any>();
  const descriptionAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    opacity: 1,
    transform: "translateY(0)",
    ref: descriptionAnimationRef
  });

  useChain(
    [mapAnimationRef, headerAnimationRef, descriptionAnimationRef],
    [0, 0.4, 0.4]
  );

  return (
    <Wrapper>
      <Header>
        <animated.div style={mapAnimation}>
          <Map
            isFixed={true}
            center={spot.location}
            zoomLevel={17}
            style={{ height: "250px" }}
          />
        </animated.div>
        <SpotInfo style={headerAnimation}>
          <p>{spot.name}</p>
          {spot.location.address && <p>{spot.location.address}</p>}
        </SpotInfo>
      </Header>

      <AuthoredBy>
        Added by <span>{spot.author.username}</span>
      </AuthoredBy>
      {spot.description && (
        <animated.div style={descriptionAnimation}>
          {" "}
          <Markdown source={spot.description} />
        </animated.div>
      )}
    </Wrapper>
  );
};
