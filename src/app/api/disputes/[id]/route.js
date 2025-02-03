import { connectToDatabase } from "@/lib/mongodb";


export async function PATCH(request, { params }) {
    const db = await connectToDatabase();
    const disputeId = params.id; // Access the dynamic 'id' from the URL path
    console.log(disputeId)
    
    if (!disputeId) {
      return new Response(
        JSON.stringify({ error: "DisputeID is required" }),
        { status: 400 }
      );
    }
  
    const { status } = await request.json(); 
    console.log(status)
  
    if (!status) {
      return new Response(
        JSON.stringify({ error: "Status and resolutionAction are required" }),
        { status: 400 }
      );
    }
  
    try {
      // Perform the update in the database
      const result = await db.collection("Dispute").updateOne(
        { DisputeID: disputeId },
        {
          $set: { Status: status, ResolutionAction: status },
        }
      );
  
      if (result.modifiedCount === 0) {
        return new Response(
          JSON.stringify({ error: "Failed to update dispute" }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ message: "Dispute updated successfully" }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }