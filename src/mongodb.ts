import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw Error("You must set the `MONGODB_URI` in the `.env`");

const client = new MongoClient(uri);

const hadithDB = client.db("hadiths");

export { client, hadithDB };
