// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

// Ensure the MongoClient instance is created only once
if (!global._mongoClient) {
  client = new MongoClient(uri);
  global._mongoClient = client;
}

export async function connectToDatabase() {
  if (!global._mongoClient.isConnected) {
    console.log('Connecting to MongoDB...');
    await global._mongoClient.connect();
    console.log('Connected to MongoDB');
  }

  return global._mongoClient.db(process.env.MONGODB_DB);
}