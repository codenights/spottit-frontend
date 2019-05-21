/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchSpot
// ====================================================

export interface FetchSpot_spot_location {
  __typename: "Location";
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface FetchSpot_spot {
  __typename: "Spot";
  id: string;
  name: string;
  description: string | null;
  location: FetchSpot_spot_location;
}

export interface FetchSpot {
  spot: FetchSpot_spot;
}

export interface FetchSpotVariables {
  id: string;
}
