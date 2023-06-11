// Imports
import { connectMongoDB, disconnectMongoDB } from "../mongoDB/connectionCreator";
import express, { Express } from 'express';
import cors from 'cors';
import { EXPRESS_SERVER_PORT } from "./constants";
import { populateMongoQuestionsCollection } from "../mongoDB/collections/questionsCollection";
import { defaultRateLimiter } from "./limiters";

// Routes
import apiRoutes from "../routes/routeHandler";


export async function createApp(): Promise<void> {
    try {
        // Create connection to MongoDB database
        await connectMongoDB();

        // Populate MongoDB with questions
        // await populateMongoQuestionsCollection();

        // Create express application
        const app: Express = createExpressApp();
        app.listen(EXPRESS_SERVER_PORT, () => {
            console.log(`Express server listening on port ${EXPRESS_SERVER_PORT}`);
        });
    } catch (error) {
        console.error('Error starting the application', error);
        await disconnectMongoDB();
    }
}

function createExpressApp(): Express {
    const app: Express = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({ credentials: true }))

    // Express routes
    app.use('/api', defaultRateLimiter, apiRoutes)

    return app;
} 
