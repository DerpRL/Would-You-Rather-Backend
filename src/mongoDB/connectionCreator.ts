// Imports
import { Db } from "mongodb";
import { MONGO_DB_CLIENT } from "../utils/builders";


export async function connectMongoDB(): Promise<void> {
    try {
        await MONGO_DB_CLIENT.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
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
