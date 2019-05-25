/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSpot
// ====================================================

export interface createSpot_createSpot_location {
  __typename: "Location";
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface createSpot_createSpot {
  __typename: "Spot";
  id: string;
  name: string;
  description: string | null;
  location: createSpot_createSpot_location;
}

export interface createSpot {
  createSpot: createSpot_createSpot;
}

export interface createSpotVariables {
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
}
