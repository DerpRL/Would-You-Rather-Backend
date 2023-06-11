import joi from 'joi';


export const voteQuestionBodyValidationSchema = joi.object({
    questionId: joi.string().required(),
    chosenOption: joi.number().integer().positive().required()
})