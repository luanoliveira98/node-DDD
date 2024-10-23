import { FetchQuestionAnswersUseCase } from './fetch-question-answers.use-case'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository'
import { makeAnswerFactory } from 'test/factories/make-answer.factory'
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'

describe('Fetch Question Answers', () => {
  let sut: FetchQuestionAnswersUseCase
  let inMemoryAnswersRepository: InMemoryAnswersRepository

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswerFactory({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswerFactory({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswerFactory({ questionId: new UniqueEntityID('question-1') }),
    )

    const { answers } = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswerFactory({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const { answers } = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(answers).toHaveLength(2)
  })
})
