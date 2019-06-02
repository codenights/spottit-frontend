/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchSpots
// ====================================================

export interface SearchSpots_spots_location {
  __typename: 'Location'
  latitude: number
  longitude: number
  address: string | null
}

export interface SearchSpots_spots {
  __typename: 'Spot'
  id: string
  name: string
  description: string | null
  location: SearchSpots_spots_location
}

export interface SearchSpots {
  spots: SearchSpots_spots[]
}

export interface SearchSpotsVariables {
  latitude: number
  longitude: number
  radius: number
}
