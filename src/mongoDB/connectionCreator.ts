// Imports
import { Collection, Db } from "mongodb";
import { MONGO_DB_CLIENT } from "../utils/builders";
import { Question } from "./interfaces";
import { MONGO_DB_DATABASE } from "../utils/constants";
import { questionsMetadata } from "./questionsData";


export async function connectMongoDB(): Promise<void> {
    try {
        await MONGO_DB_CLIENT.connect();
        // await populateMongoQuestionsCollection();

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

async function populateMongoQuestionsCollection(): Promise<void> {
    const mongoDatabase = getMongoDatabase(MONGO_DB_DATABASE);
    const questionsCollection: Collection<Question> = getMongoQuestionsCollection(mongoDatabase);

    for (let i = 0; i < questionsMetadata.length; i++) {
        await questionsCollection.insertOne({
            questionId: i + 1,
            active: true,
            nsfw: false,
            firstOption: questionsMetadata[i].firstOption,
            secondOption: questionsMetadata[i].secondOption,
        })

        console.log('Added new entry to question collection');
    }
}

export async function disconnectMongoDB(): Promise<void> {
    try {
        await MONGO_DB_CLIENT.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Failed to disconnect from MongoDB', error);
        throw error;
    }
}

export function getMongoDatabase(databaseName: string): Db {
    return MONGO_DB_CLIENT.db(databaseName);
}

export function getMongoQuestionsCollection(database: Db): Collection<Question> {
    return database.collection<Question>('questions');
}
