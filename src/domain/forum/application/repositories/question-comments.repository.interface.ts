import { QuestionComment } from '../../enterprise/entities/question-comment.entity'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
