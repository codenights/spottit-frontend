import { gql } from "apollo-boost";

import { Location } from "../model/Location";
import { Spot } from "../model/Spot";
import { graphql } from "./graphql";

interface QueryResponse {
  spots: Spot[];
}

interface QueryVariables {
  latitude: number;
  longitude: number;
  radius: number;
}

const QUERY_SEARCH_SPOTS = gql`
  query spots($latitude: Float!, $longitude: Float!, $radius: Float!) {
    spots(
      filter: { latitude: $latitude, longitude: $longitude, radius: $radius }
    ) {
      id
      name
      description
      location {
        latitude
        longitude
      }
    }
  }
`;

export const searchSpots = (location: Location) =>
  graphql
    .query<QueryResponse, QueryVariables>({
      query: QUERY_SEARCH_SPOTS,
      variables: {
        latitude: location.latitude,
        longitude: location.longitude,
        radius: 5
      }
    })
    .then(response => response.data.spots);
