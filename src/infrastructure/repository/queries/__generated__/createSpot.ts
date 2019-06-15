/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSpot
// ====================================================

export interface CreateSpot_createSpot_location {
  __typename: "Location";
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface CreateSpot_createSpot {
  __typename: "Spot";
  id: string;
  name: string;
  description: string | null;
  location: CreateSpot_createSpot_location;
}

export interface CreateSpot {
  createSpot: CreateSpot_createSpot;
}

export interface CreateSpotVariables {
  name: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  tags: string[];
}
