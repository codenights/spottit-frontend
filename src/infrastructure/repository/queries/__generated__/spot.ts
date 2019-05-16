/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: spot
// ====================================================

export interface spot_spot_location {
  __typename: "Location";
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface spot_spot {
  __typename: "Spot";
  id: string;
  name: string;
  description: string | null;
  location: spot_spot_location;
}

export interface spot {
  spot: spot_spot;
}

export interface spotVariables {
  id: string;
}
