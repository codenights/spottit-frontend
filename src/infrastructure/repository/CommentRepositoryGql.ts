import { loader } from 'graphql.macro'

import { GraphQlService } from '../services/Graphql'
import { CommentRepository } from '../../domain/repository/CommentRepository'
import { CreateComment } from '../../domain/model/Comment'
import {
  AddCommentVariables,
  AddComment,
} from './queries/__generated__/AddComment'

export const queries = {
  ADD_COMMENT: loader('./queries/add-comment.graphql'),
}

interface Dependencies {
  graphqlService: GraphQlService
}

export class CommentRepositoryGql implements CommentRepository {
  private graphql: GraphQlService

  public constructor({ graphqlService }: Dependencies) {
    this.graphql = graphqlService
  }

  public createComment(createComment: CreateComment): Promise<void> {
    return this.graphql
      .mutate<AddCommentVariables, AddComment>(queries.ADD_COMMENT, {
        body: createComment.body,
        spotId: createComment.spotId,
      })
      .then(() => undefined)
  }
}
