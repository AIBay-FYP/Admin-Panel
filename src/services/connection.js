// lib/mongodb.js
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let client;
let db;

if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const connectToDatabase = async () => {
  if (db) return { client, db };

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  
  db = client.db(MONGODB_DB);
  return { client, db };
};

export default connectToDatabase;
