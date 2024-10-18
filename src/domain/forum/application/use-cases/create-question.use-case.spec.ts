import { CreateQuestionUseCase } from './create-question.use-case'
import { QuestionsRepository } from '../repositories/question.repository'
import { Question } from '../../enterprise/entities/question.entity'

const fakeQuestionsRepository: QuestionsRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (question: Question) => {},
}

test('create a question', async () => {
  const sit = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await sit.execute({
    authorId: '1',
    title: 'New question',
    content: 'Question content',
  })

  expect(question.id).toBeTruthy()
})
