// Imports
import { NextFunction, Request, Response } from "express";


export function checkApiParams(req: Request, res: Response, next: NextFunction) {
    console.log(req.params);
    

    if (!req) return res.status(500).json({ data: null, msg: 'Invalid request.' })
    if (!req.params) return res.status(500).json({ data: null, msg: 'Invalid params.' })
    if (!req.params.questionId) return res.status(500).json({ data: null, msg: 'Invalid questionId params.' })

    next()
}
