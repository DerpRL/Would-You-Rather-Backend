export interface Question {
    active: boolean
    nsfw: boolean,
    firstOption: string,
    secondOption: string,
    voteStats: {
        optionOneVotes: number,
        optionTwoVotes: number
    }
}
