import { Question } from '../../enterprise/entities/question.entity'

export interface QuestionsRepository {
  create(question: Question): Promise<void>
}
