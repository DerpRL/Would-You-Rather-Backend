// Imports
import { connectMongoDB, disconnectMongoDB } from "../mongoDB/connectionCreator";


export async function createApp(): Promise<void> {
    try {
        await connectMongoDB();
    } catch (error) {
        console.error('Error starting the application', error);
    } finally {
        await disconnectMongoDB();
    }
}
