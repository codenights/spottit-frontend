import { CommentRepository } from '../../domain/repository/CommentRepository'
import { CreateComment } from '../../domain/model/Comment'
import { GraphQlService } from '../services/Graphql'

import { CommentRepositoryGql, queries } from './CommentRepositoryGql'

describe('CommentRepositoryGql', () => {
  let repository: CommentRepository
  let graphqlService: GraphQlService

  beforeEach(() => {
    graphqlService = {
      mutate: jest.fn(),
      query: jest.fn(),
    }

    repository = new CommentRepositoryGql({ graphqlService })
  })

  it('addComment: should call the API with correct params', async () => {
    // Given
    const createCommentCommand = new CreateComment('spot-1', 'comment body')
    ;(graphqlService.mutate as jest.Mock).mockResolvedValue(null)

    // When
    await repository.addComment(createCommentCommand)

    // Then
    expect(graphqlService.mutate).toHaveBeenCalledTimes(1)
    expect(graphqlService.mutate).toHaveBeenCalledWith(queries.ADD_COMMENT, {
      body: 'comment body',
      spotId: 'spot-1',
    })
  })
})
