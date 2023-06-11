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
    try {
        const questionsCollection: Collection<Question> = getMongoQuestionsCollection();
        await questionsCollection.deleteMany({});

        const questions: Question[] = questionsMetadata.map((question: Question) => {
            return { 
                active: true,
                nsfw: false,
                firstOption: question.firstOption,
                secondOption: question.secondOption,
                voteStats: {
                    optionOneVotes: 0,
                    optionTwoVotes: 0
                }
            }
        })
    
        await questionsCollection.insertMany(questions);
        console.log(`Added ${questions.length} questions`);
    } catch (error) {
        console.error(error);
    }   
}
