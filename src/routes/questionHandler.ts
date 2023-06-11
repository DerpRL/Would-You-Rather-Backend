import { Router } from "express";
import { getQuestionController, addQuestionController, voteQuestionController, reviewQuestionController } from "../controllers/questionController"
import { validateAddQuestionBody, validateVoteQuestionBody, validateReviewQuestionBody } from "../utils/middleware";
import { addQuestionRateLimiter, voteQuestionRateLimiter } from "../utils/limiters";


const router = Router();

router.get('/', getQuestionController);
router.post('/', addQuestionRateLimiter, validateAddQuestionBody, addQuestionController);

router.post('/review', validateReviewQuestionBody, reviewQuestionController);

router.post('/vote', voteQuestionRateLimiter, validateVoteQuestionBody, voteQuestionController);

export default router
