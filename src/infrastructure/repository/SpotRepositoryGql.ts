import { loader } from "graphql.macro";

import { SpotRepository } from "../../domain/repository/SpotRepository";
import { Spot, CreateSpotCommand } from "../../domain/model/Spot";
import { Location } from "../../domain/model/Location";
import { GraphQlService } from "../services/Graphql";
import { spot, spotVariables } from "./queries/__generated__/spot";
import { spotsVariables, spots } from "./queries/__generated__/spots";
import {
  createSpot,
  createSpotVariables
} from "./queries/__generated__/createSpot";

const queries = {
  SPOT: loader("./queries/spot.graphql"),
  SEARCH_SPOT: loader("./queries/search-spots.graphql"),
  CREATE_SPOT: loader("./queries/create-spot.graphql")
};

interface Dependencies {
  graphqlService: GraphQlService;
}

export class SpotRepositoryGql implements SpotRepository {
  private graphql: GraphQlService;

  public constructor({ graphqlService }: Dependencies) {
    this.graphql = graphqlService;
  }

  public getSpot(id: string): Promise<Spot> {
    return this.graphql
      .query<spotVariables, spot>(queries.SPOT, {
        id
      })
      .then(response => response.spot);
  }

  public getSpotsByLocation(
    location: Location,
    radius: number
  ): Promise<Spot[]> {
    return this.graphql
      .query<spotsVariables, spots>(queries.SEARCH_SPOT, {
        latitude: location.latitude,
        longitude: location.longitude,
        radius
      })
      .then(response => response.spots);
  }

  public createSpot(createSpot: CreateSpotCommand) {
    return this.graphql
      .mutate<createSpotVariables, createSpot>(queries.CREATE_SPOT, {
        description: createSpot.description,
        latitude: createSpot.location.latitude,
        longitude: createSpot.location.longitude,
        name: createSpot.name
      })
      .then(response => response.createSpot);
  }
}
