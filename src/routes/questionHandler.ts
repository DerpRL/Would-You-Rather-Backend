import { Router } from "express";
import { getQuestionController, voteQuestionController } from "../controllers/questionController"
import { validateVoteQuestionBody } from "../utils/middleware";


const router = Router();

router.get('/', getQuestionController);
router.post('/vote', validateVoteQuestionBody, voteQuestionController);

export default router
