import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('User');
    
    const searches = await collection
      .find({ RoleType: { $in: ['Provider', 'Consumer'] } })
      .sort({ _id: -1 }) // Sort in descending order by _id
      .toArray();
  
    return new Response(JSON.stringify(searches), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch users' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
