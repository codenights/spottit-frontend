/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddComment
// ====================================================

export interface AddComment_addComment {
  __typename: "Comment";
  id: string;
}

export interface AddComment {
  addComment: AddComment_addComment | null;
}

export interface AddCommentVariables {
  spotId: string;
  body: string;
}
