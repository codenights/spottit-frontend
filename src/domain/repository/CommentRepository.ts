import { CreateComment } from '../model/Comment'

export interface CommentRepository {
  addComment(createComment: CreateComment): Promise<void>
}
