// Imports
import { Router } from "express";
import { getQuestionController } from "../controllers/questionController"
import { checkApiParams } from "./middleware";


const router = Router();

router.get('/:questionId', checkApiParams, getQuestionController);

export default router
