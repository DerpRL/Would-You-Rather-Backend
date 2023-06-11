import { Router } from "express";
import { getQuestionController, addQuestionController, voteQuestionController, reviewQuestionController } from "../controllers/questionController"
import { validateAddQuestionBody, validateVoteQuestionBody, validateReviewQuestionBody } from "../utils/middleware";


const router = Router();

router.get('/', getQuestionController);
router.post('/', validateAddQuestionBody, addQuestionController);

router.post('/review', validateReviewQuestionBody, reviewQuestionController);

router.post('/vote', validateVoteQuestionBody, voteQuestionController);

export default router
