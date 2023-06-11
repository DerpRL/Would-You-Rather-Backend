import { Condition, ObjectId } from "mongodb"

export type ApiVoteQuestionBody = {
    questionId: ObjectId,
    chosenOption: number
}

export type ApiAddQuestionBody = {
    firstOption: string,
    secondOption: string
}

export type ApiReviewQuestionBody = {
    questionId: ObjectId
    setActive: boolean
}
