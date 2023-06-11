import joi, { ObjectSchema } from 'joi';


export const voteQuestionBodyValidationSchema: ObjectSchema = joi.object({
    questionId: joi.string().required(),
    chosenOption: joi.number().integer().positive().min(1).max(2).required()
})

export const addQuestionBodyValidationSchema: ObjectSchema = joi.object({
    firstOption: joi.string().min(5).max(70).required(),
    secondOption: joi.string().min(5).max(70).required()
})


export const reviewQuestionBodyValidationSchema: ObjectSchema = joi.object({
    questionId: joi.string().required(),
    setActive: joi.boolean().required()
})
