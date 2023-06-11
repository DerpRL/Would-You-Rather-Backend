// Imports
import { Router } from "express";
import { getQuestionController, voteQuestionController } from "../controllers/questionController"
import { checkApiParams, validateVoteQuestionBody } from "../utils/middleware";


const router = Router();

router.get('/:questionId', checkApiParams, getQuestionController);
router.post('/:questionId/vote', checkApiParams, validateVoteQuestionBody, voteQuestionController);

export default router
