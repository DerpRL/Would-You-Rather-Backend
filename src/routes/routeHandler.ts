import { NextFunction, Request, Response, Router } from "express";
import questionsRouter from "./questionHandler";


const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming Request: { Method: ${req.method}, URI: ${req.path} }`);
    next();
})

router.use('/questions', questionsRouter)

export default router
