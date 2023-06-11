import { Collection, ObjectId, WithId } from 'mongodb';
import { Request, Response } from "express";
import { Question } from '../utils/interfaces';
import { getMongoQuestionsCollection } from '../mongoDB/collections/questionsCollection';
import { ApiAddQuestionBody, ApiReviewQuestionBody, ApiVoteQuestionBody } from '../utils/types';


export async function getQuestionController(req: Request, res: Response) {
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        const totalDocumentsCount: number = await questionsCollection.countDocuments({ active: true});
        const randomIndex: number = Math.floor(Math.random() * totalDocumentsCount);
        const question: WithId<Question> | null = await questionsCollection.findOne({ active: true }, { skip: randomIndex, limit: 1 });

        if (!question) return res.status(404).json({ data: null, msg: 'No question found with that id.' });

        return res.status(200).json({ data: { id: question._id, firstOption: question.firstOption, secondOption: question.secondOption, voteStats: question.voteStats } });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to retrieve question metadata.' });
    }
}

export async function addQuestionController(req: Request, res: Response) {
    const body: ApiAddQuestionBody = req.body;
    
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();

        const questionMetadata: Question = {
            active: false,
            nsfw: false,
            firstOption: body.firstOption,
            secondOption: body.secondOption,
            voteStats: {
                optionOneVotes: 0,
                optionTwoVotes: 0
            }
        }

        await questionsCollection.insertOne(questionMetadata);
        return res.status(201).json({ msg: 'Created successfully, now under review.' });
    } catch (error) {
        return res.status(500).json({ msg: 'Failed to create.' });
    }
}

export async function voteQuestionController(req: Request, res: Response) {
    const body: ApiVoteQuestionBody = req.body;
    
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        const questionToUpdate: Question | null = await questionsCollection.findOne({ _id: new ObjectId(body.questionId) });

        if (!questionToUpdate) return res.status(404).json({ msg: 'No question found with that id.' });
        if (!questionToUpdate.active) return res.status(404).json({ msg: 'Question is not active.' });

        await questionsCollection.updateOne(
            { _id: new ObjectId(body.questionId) },
            { $inc: body.chosenOption === 1 ? { 'voteStats.optionOneVotes': 1 } : { 'voteStats.optionTwoVotes': 1 } }
        )
        
        return res.status(200).json({ msg: 'Vote successful.' });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to update votes for the question.' });
    }
}

export async function reviewQuestionController(req: Request, res: Response) {
    const body: ApiReviewQuestionBody = req.body;

    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        const questionToUpdate: Question | null = await questionsCollection.findOne({ _id: new ObjectId(body.questionId) });

        if (!questionToUpdate) return res.status(404).json({ msg: 'No question found with that id.' });

        await questionsCollection.updateOne(
            { _id: new ObjectId(body.questionId) },
            { $set: { active: body.setActive } }
        )

        return res.status(200).json({ msg: body.setActive ? 'This question has been set active.' : 'This question has been set inactive.' });
    } catch (error) {
        return res.status(500).json({ msg: 'Failed to update review status for the question.' });
    }
}
