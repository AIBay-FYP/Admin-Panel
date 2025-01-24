// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string
let client;
let clientPromise;

// Ensure the MongoClient instance is created only once
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function connectToDatabase() {
  if (!client || !client.isConnected) {
    console.log('Connecting to MongoDB...');
    client = await clientPromise;
    console.log('Connected to MongoDB');
  }
  return client.db(process.env.MONGODB_DB); 
}
