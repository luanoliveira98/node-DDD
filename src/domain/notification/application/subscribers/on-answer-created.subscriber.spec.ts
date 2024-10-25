import { makeAnswerFactory } from "test/factories/make-answer.factory"
import { OnAnswerCreatedSubscriber } from "./on-answer-created.subscriber"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers.repository"
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments.repository"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository

describe('On Answer Created Subscriber', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
  })

  it('should be able to send a notification when an answer is created', () => {
    const onAnswerCreated = new OnAnswerCreatedSubscriber()

    const answer = makeAnswerFactory()

    inMemoryAnswersRepository.create(answer)
  })
})