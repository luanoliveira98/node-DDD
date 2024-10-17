import { AnswerQuestionUseCase } from './answer-question.use-case'
import { AnswerRepository } from '../repositories/answers.repository'
import { Answer } from '../entities/answer.entity'

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const sit = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await sit.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
