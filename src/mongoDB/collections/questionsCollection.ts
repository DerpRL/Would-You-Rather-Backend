// Imports
import { Collection, Db } from "mongodb";
import { MONGO_DB_DATABASE } from "../../utils/constants";
import { getMongoDatabase } from "../connectionCreator";
import { Question } from "../../utils/interfaces";
import { questionsMetadata } from "../questionsData";


export function getMongoQuestionsCollection(): Collection<Question> {
    const mongoDatabase: Db = getMongoDatabase(MONGO_DB_DATABASE);
    return mongoDatabase.collection<Question>('questions');
}

export async function populateMongoQuestionsCollection(): Promise<void> {
    const questionsCollection: Collection<Question> = getMongoQuestionsCollection();

    await questionsCollection.deleteMany({});

    for (let i = 0; i < questionsMetadata.length; i++) {
        await questionsCollection.insertOne({
            questionId: i + 1,
            active: true,
            nsfw: false,
            firstOption: questionsMetadata[i].firstOption,
            secondOption: questionsMetadata[i].secondOption,
            voteStats: {
                optionOneVotes: 0,
                optionTwoVotes: 0
            }
        })

        console.log('Added new entry to question collection');
    }
}