import { connectToDatabase } from "@/lib/mongodb"; 
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = await params; 

  try {
    const db = await connectToDatabase();
    const listedServicesCollection = db.collection("listings");

    const service = await listedServicesCollection.findOne({ _id: new ObjectId(id) });

    if (!service) {
      return new Response(JSON.stringify({ message: "Service not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}
