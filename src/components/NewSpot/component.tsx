import React, { useState } from "react";

import { generateTags } from "../../domain/helpers/generateTags";

import { useDependency } from "../../di";
import { Label, Input, Textarea, FormGroup, SubmitGroup } from "../../ui/Form";
import { Button, Link } from "../../ui/Button";
import { Map } from "../../ui/Map";

import { useHistory } from "../../hooks/useHistory";
import { Content } from "./styles";

export interface NewSpotProps {
  latitude: number;
  longitude: number;
}

export const NewSpot: React.FC<NewSpotProps> = ({ latitude, longitude }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
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
        zoomLevel={17}
        currentPosition={{ latitude, longitude }}
        center={{ latitude, longitude }}
        style={{ height: "150px" }}
        isFixed={true}
      />

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
            <Label htmlFor="spot__tags">Tags</Label>
            <Input
              type="text"
              id="spot__tags"
              name="spot__tags"
              required
              value={tags}
              onChange={e => setTags(generateTags(e.target.value))}
              placeholder="#someTags"
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
