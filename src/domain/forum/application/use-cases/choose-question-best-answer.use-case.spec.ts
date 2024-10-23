import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { makeQuestionFactory } from 'test/factories/make-question.factory'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.use-case'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository'
import { makeAnswerFactory } from 'test/factories/make-answer.factory'

describe('Choose Question Best Answer', () => {
  let sut: ChooseQuestionBestAnswerUseCase
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let inMemoryAnswersRepository: InMemoryAnswersRepository

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const question = makeQuestionFactory()
    const answer = makeAnswerFactory({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestionFactory()
    const answer = makeAnswerFactory({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await expect(() =>
      sut.execute({
        authorId: 'wrong-author-id',
        answerId: answer.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).not.toEqual(
      answer.id,
    )
  })
})
