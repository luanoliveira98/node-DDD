import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions.repository'
import { EditQuestionUseCase } from './edit-question.use-case'
import { makeQuestionFactory } from 'test/factories/make-question.factory'
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'

describe('Edit Question', () => {
  let sut: EditQuestionUseCase
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestionFactory()

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      questionId: newQuestion.id.toValue(),
      title: 'Question test',
      content: 'Content test',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Question test',
      content: 'Content test',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestionFactory(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'Different-author-id',
        questionId: newQuestion.id.toValue(),
        title: 'Question test',
        content: 'Content test',
      }),
    ).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionsRepository.items[0]).not.toMatchObject({
      title: 'Question test',
      content: 'Content test',
    })
  })
})
