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

export interface FetchSpot_spot_author {
  __typename: "User";
  username: string;
}

export interface FetchSpot_spot_comments_author {
  __typename: "User";
  id: string;
  username: string;
}

export interface FetchSpot_spot_comments {
  __typename: "Comment";
  id: string;
  author: FetchSpot_spot_comments_author;
  body: string;
  createdAt: string;
}

export interface FetchSpot_spot {
  __typename: "Spot";
  id: string;
  name: string;
  description: string | null;
  location: FetchSpot_spot_location;
  author: FetchSpot_spot_author;
  comments: FetchSpot_spot_comments[];
}

export interface FetchSpot {
  spot: FetchSpot_spot;
}

export interface FetchSpotVariables {
  id: string;
}
