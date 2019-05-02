import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import { getSpot } from "../../domain/usecase/get-spot";
import { Spot } from "../../domain/model/Spot";
import { H1, Paragraph } from "../../ui/Typography";
import { Wrapper, Markdown } from "./styles";

export interface SpotDetailsProps {
  spotId: string;
}

const Heading = (props: any) => {
  if (props.level === 1) {
    return <div className="heading">{props.children}</div>;
  }

  return <ReactMarkdown.renderers.heading {...props} />;
};

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spotId }) => {
  const [spot, setSpot] = useState<Spot | null>(null);

  useEffect(() => {
    getSpot(spotId).then(setSpot);
  }, [spotId]);

  if (!spot) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <H1>{spot.name}</H1>
      <Paragraph>{spot.location.address}</Paragraph>
      {spot.description && (
        <Markdown source={spot.description} renderers={{ heading: Heading }} />
      )}
    </Wrapper>
  );
};
