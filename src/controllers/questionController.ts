// Imports
import { Collection } from 'mongodb';
import { Request, Response } from "express";
import { getMongoDatabase, getMongoQuestionsCollection } from "../mongoDB/connectionCreator";
import { MONGO_DB_DATABASE } from "../utils/constants";
import { Question } from '../mongoDB/interfaces';


export async function getQuestionController(req: Request, res: Response) {
    try {
        const mongoDatabase = getMongoDatabase(MONGO_DB_DATABASE);
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection(mongoDatabase);
        const question = await questionsCollection.findOne({ questionId: parseInt(req.params.questionId), active: true });

        if (!question) return res.status(404).json({ data: null, msg: 'No question found with that id.' });

        return res.status(200).json({ data: question });
    } catch (error) {
        return res.status(500).json({ data: null, msg: 'Failed to retrieve question metadata.' });
    }
}
