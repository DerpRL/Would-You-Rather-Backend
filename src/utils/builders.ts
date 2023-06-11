import 'dotenv/config'
import { MongoClient } from "mongodb";


export const MONGO_DB_CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}`;
export const MONGO_DB_CLIENT = new MongoClient(MONGO_DB_CONNECTION_STRING, { appName: 'Would You Rather' });
