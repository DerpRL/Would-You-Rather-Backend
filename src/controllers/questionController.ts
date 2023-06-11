import { Collection, ObjectId, WithId } from 'mongodb';
import { Request, Response } from "express";
import { Question } from '../utils/interfaces';
import { getMongoQuestionsCollection } from '../mongoDB/collections/questionsCollection';
import { ApiVoteQuestionBody } from '../utils/types';


export async function getQuestionController(req: Request, res: Response) {
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        const totalDocumentsCount: number = await questionsCollection.countDocuments({ active: true});
        console.log(`The questions collection has ${totalDocumentsCount} documents.`);

        const randomIndex: number = Math.floor(Math.random() * totalDocumentsCount);
        const question: WithId<Question> | null = await questionsCollection.findOne({ active: true }, { skip: randomIndex, limit: 1 });

        if (!question) return res.status(404).json({ data: null, msg: 'No question found with that id.' });

        return res.status(200).json({ data: { id: question._id, firstOption: question.firstOption, secondOption: question.secondOption, voteStats: question.voteStats } });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to retrieve question metadata.' });
    }
}

export async function voteQuestionController(req: Request, res: Response) {
    const body: ApiVoteQuestionBody = req.body;
    
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        
        await questionsCollection.findOneAndUpdate(
            { _id: new ObjectId(body.questionId) },
            { $inc: body.chosenOption === 1 ? { 'voteStats.optionOneVotes': 1 } : { 'voteStats.optionTwoVotes': 1 } }
        )
        
        console.log('Updated vote stats for question ' + body.questionId);
        return res.status(200).json({ msg: 'Vote successful.' });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to update votes for the question.' });
    }
}
