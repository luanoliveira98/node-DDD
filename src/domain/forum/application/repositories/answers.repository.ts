import { Answer } from '../../enterprise/entities/answer.entity'

export interface AnswerRepository {
  create(answer: Answer): Promise<void>
}
