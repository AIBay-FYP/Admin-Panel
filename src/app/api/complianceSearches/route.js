// app/api/listings/route.js
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    const collection = db.collection('ComplianceSearch');
    const searches = await collection.find({}).toArray();

    return new Response(JSON.stringify(searches), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch listings' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
