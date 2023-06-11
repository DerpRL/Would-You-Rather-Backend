export interface Question {
    questionId: number
    active: boolean
    nsfw: boolean,
    firstOption: string,
    secondOption: string,
    voteStats: {
        optionOneVotes: number,
        optionTwoVotes: number
    }
}
