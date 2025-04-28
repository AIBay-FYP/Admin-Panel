import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from "mongodb";


export async function GET() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    const collection = db.collection('ComplianceSearch');
    const searches = await collection
    .aggregate([
      {
        $addFields: {
          sortOrder: {
            $cond: {
              if: { $eq: ["$status", "Block permanently"] },
              then: 1, // Set a higher sort order for "Block permanently"
              else: 0, // Lower sort order for others
            },
          },
        },
      },
      {
        $sort: {
          sortOrder: 1, // Sort by the custom `sortOrder` field
          _id: -1, // Then sort in reverse order by `_id`
        },
      },
    ])
    .toArray();
  
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



export async function PUT(req) {
  const db = await connectToDatabase();
  const complianceSearch = db.collection("ComplianceSearch");

  try {
    const { id, status } = await req.json();

    // Check if `id` and `status` are provided
    if (!id || !status) {
      return new Response(
        JSON.stringify({ message: "Invalid request data" }),
        { status: 400 }
      );
    }

    // Validate and convert `id` to `ObjectId`
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid ID format" }),
        { status: 400 }
      );
    }

    const objectId = new ObjectId(id);

    // Update the document in the database
    const result = await complianceSearch.updateOne(
      { _id: objectId },
      {
        $set: { Status: status },
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Status not found or not updated" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Status updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Status:", error);
    return new Response(
      JSON.stringify({ message: "Error updating status" }),
      { status: 500 }
    );
  }
}