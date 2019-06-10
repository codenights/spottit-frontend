import { CreateComment } from '../model/Comment'

export interface CommentRepository {
  createComment(createComment: CreateComment): Promise<void>
}
