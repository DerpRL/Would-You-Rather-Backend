import { Condition, ObjectId } from "mongodb"

export type ApiVoteQuestionBody = {
    questionId: ObjectId,
    chosenOption: number
}
