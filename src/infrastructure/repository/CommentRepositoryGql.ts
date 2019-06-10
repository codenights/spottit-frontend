import { loader } from 'graphql.macro'

import { GraphQlService } from '../services/Graphql'
import { CommentRepository } from '../../domain/repository/CommentRepository'
import { CreateComment } from '../../domain/model/Comment'
import { EventDispatcher } from '../../domain/events/Dispatcher'
import {
  AddCommentVariables,
  AddComment,
} from './queries/__generated__/AddComment'

export const queries = {
  ADD_COMMENT: loader('./queries/add-comment.graphql'),
}

interface Dependencies {
  graphqlService: GraphQlService
  eventDispatcher: EventDispatcher
}

export class CommentRepositoryGql implements CommentRepository {
  private graphql: GraphQlService
  private eventDispatcher: EventDispatcher

  public constructor({ graphqlService, eventDispatcher }: Dependencies) {
    this.graphql = graphqlService
    this.eventDispatcher = eventDispatcher
  }

  public createComment(createComment: CreateComment): Promise<void> {
    return this.graphql
      .mutate<AddCommentVariables, AddComment>(queries.ADD_COMMENT, {
        body: createComment.body,
        spotId: createComment.spotId,
      })
      .then(response => {
        const comment = response.addComment

        if (!comment) {
          throw new Error('No commen has been created')
        }
        this.eventDispatcher.dispatch({
          comment: {
            ...comment,
            spotId: createComment.spotId,
          },
          type: 'comment_added',
        })
      })
      .then(() => undefined)
  }
}
