import { NextFunction, Request, Response, Router } from "express";
import questionsRouter from "./questionHandler";
import authRouter from './authHandler';


const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming Request: { Method: ${req.method}, URI: ${req.path} }`);
    next();
})

router.use('/questions', questionsRouter)
router.use('/auth', authRouter)

export default router
