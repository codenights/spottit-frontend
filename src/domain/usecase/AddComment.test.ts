import { AddComment } from './AddComment'
import { CommentRepository } from '../repository/CommentRepository'

describe('AddComment', () => {
  let repository: CommentRepository
  let useCase: AddComment

  beforeEach(() => {
    repository = {
      createComment: jest.fn(),
    }
    useCase = new AddComment({ commentRepository: repository })
  })

  it('execute: should create the comment', async () => {
    // Given
    const spotId = 'spot-1'
    const body = 'comment body'
    ;(repository.createComment as jest.Mock).mockResolvedValue(null)

    // When
    const result: any = await useCase.execute(spotId, body)

    // Then
    expect(repository.createComment).toHaveBeenCalledTimes(1)
    expect(repository.createComment).toHaveBeenCalledWith({ spotId, body })
    expect(result.data).toEqual(null)
    expect(result.success).toEqual(true)
  })

  it('execute: should return a failure if an error is thrown', async () => {
    // Given
    ;(repository.createComment as jest.Mock).mockRejectedValue(
      new Error('Test error')
    )

    // When
    const result: any = await useCase.execute('', '')

    // Then
    expect(result.data).toBeUndefined()
    expect(result.error).toEqual(new Error('Test error'))
    expect(result.success).toEqual(false)
  })
})
