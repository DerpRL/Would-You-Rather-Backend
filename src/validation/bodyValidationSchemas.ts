// Imports
import joi from 'joi';


export const voteQuestionBodyValidationSchema = joi.object({
    chosenOption: joi.number().integer().positive().required()
})