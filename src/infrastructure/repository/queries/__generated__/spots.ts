/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: spots
// ====================================================

export interface spots_spots_location {
  __typename: "Location";
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface spots_spots {
  __typename: "Spot";
  id: string;
  name: string;
  description: string | null;
  location: spots_spots_location;
}

export interface spots {
  spots: spots_spots[];
}

export interface spotsVariables {
  latitude: number;
  longitude: number;
  radius: number;
}
