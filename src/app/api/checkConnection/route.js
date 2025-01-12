import connectToDatabase from "@/services/connection";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collections = await db.listCollections().toArray();

    return new Response(
      JSON.stringify({
        message: 'Connected to MongoDB successfully',
        collections: collections.map((col) => col.name),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    return new Response(
      JSON.stringify({ message: 'Failed to connect to MongoDB', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
