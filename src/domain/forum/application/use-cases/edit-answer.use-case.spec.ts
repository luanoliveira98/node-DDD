import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository'
import { EditAnswerUseCase } from './edit-answer.use-case'
import { makeAnswerFactory } from 'test/factories/make-answer.factory'
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'

describe('Edit Answer', () => {
  let sut: EditAnswerUseCase
  let inMemoryAnswersRepository: InMemoryAnswersRepository

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswerFactory()

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: newAnswer.authorId.toValue(),
      answerId: newAnswer.id.toValue(),
      content: 'Content test',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content test',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswerFactory(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: 'Different-author-id',
        answerId: newAnswer.id.toValue(),
        content: 'Content test',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswersRepository.items[0]).not.toMatchObject({
      content: 'Content test',
    })
  })
})
