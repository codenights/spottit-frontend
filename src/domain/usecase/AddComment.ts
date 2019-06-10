import { CommentRepository } from '../repository/CommentRepository'
import {
  UseCaseResult,
  createUseCaseSuccess,
  createUseCaseFailure,
} from '../model/UseCaseResult'
import { CreateComment } from '../model/Comment'

interface Dependencies {
  commentRepository: CommentRepository
}

export class AddComment {
  private commentRepository: CommentRepository

  public constructor({ commentRepository }: Dependencies) {
    this.commentRepository = commentRepository
  }

  public execute(
    spotId: string,
    body: string
  ): Promise<UseCaseResult<void, Error>> {
    const createCommentCommand = new CreateComment(spotId, body)

    return this.commentRepository
      .createComment(createCommentCommand)
      .then(createUseCaseSuccess)
      .catch(createUseCaseFailure)
  }
}
