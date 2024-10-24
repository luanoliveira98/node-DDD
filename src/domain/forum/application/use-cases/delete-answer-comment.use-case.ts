import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments.repository.interface'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<string, NonNullable<unknown>>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answer = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answer) {
      return left('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      return left('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answer)

    return right({})
  }
}
