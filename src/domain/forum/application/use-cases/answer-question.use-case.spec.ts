import { AnswerQuestionUseCase } from './answer-question.use-case'
import { AnswersRepository } from '../repositories/answers.repository'
import { Answer } from '../../enterprise/entities/answer.entity'

const fakeAnswersRepository: AnswersRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {},
}

test('create an answer', async () => {
  const sit = new AnswerQuestionUseCase(fakeAnswersRepository)

  const { answer } = await sit.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
