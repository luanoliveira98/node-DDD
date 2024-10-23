import { AnswerComment } from '../../enterprise/entities/answer-comment.entity'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
