import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.use-case'

test('create an answer', () => {
  const sit  = new AnswerQuestionUseCase()

  const answer = sit.execute({
    questionId: '1',
    instructorId: '1',
    content: 'New answer'
  })

  expect(answer.content).toEqual('New answer')
})