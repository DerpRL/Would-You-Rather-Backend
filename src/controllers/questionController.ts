// Imports
import { Collection } from 'mongodb';
import { Request, Response } from "express";
import { Question } from '../utils/interfaces';
import { getMongoQuestionsCollection } from '../mongoDB/collections/questionsCollection';
import { ApiVoteQuestionBody } from '../utils/types';


export async function getQuestionController(req: Request, res: Response) {
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        const question = await questionsCollection.findOne({ questionId: parseInt(req.params.questionId), active: true });

        if (!question) return res.status(404).json({ data: null, msg: 'No question found with that id.' });

        return res.status(200).json({ data: { id: question.questionId, firstOption: question.firstOption, secondOption: question.secondOption, voteStats: question.voteStats } });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to retrieve question metadata.' });
    }
}

export async function voteQuestionController(req: Request, res: Response) {
    const body: ApiVoteQuestionBody = req.body;
    const questionId = parseInt(req.params.questionId);

    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        await questionsCollection.findOneAndUpdate(
            { questionId: questionId },
            { $inc: body.chosenOption === 1 ? { 'voteStats.optionOneVotes': 1 } : { 'voteStats.optionTwoVotes': 1 } }
        )
        
        console.log('Updated vote stats for question ' + questionId);
        return res.status(200).json({ msg: 'Vote successful.' });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to update votes for the question.' });
    }
}
