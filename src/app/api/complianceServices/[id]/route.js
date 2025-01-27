import { connectToDatabase } from "@/lib/mongodb"; // Replace with your database connection logic
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = await params; 

  try {
    const db = await connectToDatabase();
    const LogCollection = db.collection("ComplianceLog");

    // Use .toArray() to retrieve the results as an array
    const logs = await LogCollection.find(
      { ListingID: new ObjectId(id) },
      { projection: { LogID: 1, LastReviewed: 1, ViolationType: 1, Status: 1 } }
    ).toArray();

    if (!logs || logs.length === 0) {
      return new Response(JSON.stringify({ message: "Logs not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
