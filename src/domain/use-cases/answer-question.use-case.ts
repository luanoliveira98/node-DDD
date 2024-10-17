import { Answer } from '../entities/answer.entity'
import { AnswerRepository } from '../repositories/answers.repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      questionId,
      authorId: instructorId,
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
