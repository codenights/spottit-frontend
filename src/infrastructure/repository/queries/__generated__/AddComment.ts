/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddComment
// ====================================================

export interface AddComment_addComment_author {
  __typename: "User";
  id: string;
  username: string;
}

export interface AddComment_addComment_spot {
  __typename: "Spot";
  id: string;
}

export interface AddComment_addComment {
  __typename: "Comment";
  id: string;
  author: AddComment_addComment_author;
  spot: AddComment_addComment_spot;
  body: string;
  createdAt: string;
}

export interface AddComment {
  addComment: AddComment_addComment | null;
}

export interface AddCommentVariables {
  spotId: string;
  body: string;
}
