import { Question } from '../../enterprise/entities/question.entity'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
