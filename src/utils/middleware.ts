import { NextFunction, Request, Response } from "express";
import { voteQuestionBodyValidationSchema } from "../validation/bodyValidationSchemas";


export function checkApiParams(req: Request, res: Response, next: NextFunction) {
    if (!req) return res.status(500).json({ data: null, msg: 'Invalid request.' })
    if (!req.params) return res.status(500).json({ data: null, msg: 'Invalid params.' })
    if (!req.params.questionId) return res.status(500).json({ data: null, msg: 'Invalid questionId params.' })

    next()
}

export async function validateVoteQuestionBody(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req || !req.body) return res.status(400).json({ msg: 'Invalid request body.' })

        await voteQuestionBodyValidationSchema.validateAsync(req.body)
        return next();
    } catch (error) {
        console.error('Error in the validation body for questions', error);
        return res.status(400).json({ msg: `There are errors in the body.` })
    };
}
