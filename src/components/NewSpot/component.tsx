import React, { useState } from "react";
import { Circle, Map, TileLayer } from "react-leaflet";

import { useDependency } from "../../di";
import { Label, Input, Textarea, FormGroup, SubmitGroup } from "../../ui/Form";
import { Button, Link } from "../../ui/Button";

import { Content } from "./styles";
import { useHistory } from "../../hooks/useHistory";

export interface NewSpotProps {
  latitude: number;
  longitude: number;
}

export const NewSpot: React.FC<NewSpotProps> = ({ latitude, longitude }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const useCase = useDependency("createSpot");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    useCase
      .execute(
        title,
        {
          latitude,
          longitude
        },
        description
      )
      .then(() => history.replace("/s"));
  };

  return (
    <div>
      <Map
        zoom={16}
        center={[latitude, longitude]}
        style={{ height: "150px" }}
        dragging={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Circle
          center={[latitude, longitude]}
          color="red"
          fillColor="#f03"
          fillOpacity={0.5}
          radius={20}
        />
      </Map>

      <Content>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Label htmlFor="spot__title">Spot name</Label>
            <Input
              type="text"
              id="spot__title"
              name="spot__title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter the spot name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="spot__description">Spot description</Label>
            <Textarea
              id="spot__description"
              name="spot__description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Write more details about this spot"
            />
          </FormGroup>

          <SubmitGroup>
            <Link to="/s">Cancel</Link>
            <Button type="submit">Create spot</Button>
          </SubmitGroup>
        </form>
      </Content>
    </div>
  );
};
