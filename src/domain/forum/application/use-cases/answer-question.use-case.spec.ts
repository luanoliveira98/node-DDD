import { AnswerQuestionUseCase } from './answer-question.use-case'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers.repository'

describe('Answer Question', () => {
  let inMemoryAnswerRepository: InMemoryAnswersRepository
  let sut: AnswerQuestionUseCase

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'New answer',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
