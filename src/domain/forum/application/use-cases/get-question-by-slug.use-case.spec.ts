import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.use-case'
import { Question } from '../../enterprise/entities/question.entity'
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

describe('Get Question By Slug', () => {
  let sut: GetQuestionBySlugUseCase
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID('1'),
      content: 'Example content',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
