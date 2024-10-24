import { CreateQuestionUseCase } from './create-question.use-case'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'

describe('Create Question', () => {
  let sut: CreateQuestionUseCase
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
