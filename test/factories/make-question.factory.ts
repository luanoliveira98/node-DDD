import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question.entity'

export function makeQuestionFactory(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Example question',
    authorId: new UniqueEntityID('1'),
    content: 'Example content',
    ...override,
  })

  return question
}
