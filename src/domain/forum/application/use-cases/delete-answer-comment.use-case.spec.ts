import { makeAnswerCommentFactory } from 'test/factories/make-answer-comment.factory'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment.use-case'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments.repository'

describe('Delete Answer Comment', () => {
  let sut: DeleteAnswerCommentUseCase
  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerCommentFactory()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const answerComment = makeAnswerCommentFactory()

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await expect(() =>
      sut.execute({
        authorId: 'Wrong-author-id',
        answerCommentId: answerComment.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
  })
})
