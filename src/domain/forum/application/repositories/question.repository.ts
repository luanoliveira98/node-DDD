import { Question } from '../../enterprise/entities/question.entity'

export interface QuestionsRepository {
  findyById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
