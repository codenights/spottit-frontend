import { gql } from "apollo-boost";

import { Spot } from "../model/Spot";
import { graphql } from "./graphql";

interface QueryResponse {
  spot: Spot;
}

interface QueryVariables {
  id: string;
}

const QUERY_SEARCH_SPOTS = gql`
  query spot($id: String!) {
    spot(id: $id) {
      id
      name
      description
      location {
        latitude
        longitude
        address
      }
    }
  }
`;

export const getSpot = (id: string) =>
  graphql
    .query<QueryResponse, QueryVariables>({
      query: QUERY_SEARCH_SPOTS,
      variables: {
        id
      }
    })
    .then(response => response.data.spot);
