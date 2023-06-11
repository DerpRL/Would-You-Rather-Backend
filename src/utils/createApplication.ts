import { connectMongoDB, disconnectMongoDB } from "../mongoDB/connectionCreator";
import express, { Express } from 'express';
import session from 'express-session';
import passport from "passport";
import cors from 'cors';
import { EXPRESS_SERVER_PORT } from "./constants";
import { populateMongoQuestionsCollection } from "../mongoDB/collections/questionsCollection";
import { defaultRateLimiter } from "./limiters";

// Routes
import apiRoutes from "../routes/routeHandler";

// Initialize Google OAuth2
require('../strategies/google');


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

    // Session
    app.use(session({
        name: 'wyr-oauth',
        secret: process.env.EXPRESS_SESSION_SECRET_KEY!,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === 'production'            
        },
    }))

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Express routes
    app.use('/api', defaultRateLimiter, apiRoutes)

    return app;
} 
