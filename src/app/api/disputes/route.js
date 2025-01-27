import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  const db = await connectToDatabase();
  const url = new URL(request.url);
  const disputeId = url.searchParams.get("DisputeID"); // Get DisputeID if provided

  try {
    if (disputeId) {
      // Fetch a specific dispute
      const query = { DisputeID: disputeId };

      const dispute = await db.collection("Dispute").aggregate([
        { $match: query },
        {
          $lookup: {
            from: "User",
            localField: "CreatedBy",
            foreignField: "_id",
            as: "creatorDetails",
          },
        },
        { $unwind: { path: "$creatorDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            DisputeID: 1,
            Description: 1,
            Status: 1,
            Date: 1,
            "creatorDetails.Name": 1,
            Evidence: 1,
          },
        },
      ]).toArray();

      if (!dispute || dispute.length === 0) {
        return new Response(
          JSON.stringify({ error: "Dispute not found" }),
          { status: 404 }
        );
      }

      return new Response(JSON.stringify(dispute[0]), { status: 200 });
    } else {
      // Fetch all disputes
      const disputes = await db.collection("Dispute").aggregate([
        {
          $lookup: {
            from: "User",
            localField: "CreatedBy",
            foreignField: "_id",
            as: "creatorDetails",
          },
        },
        { $unwind: { path: "$creatorDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            DisputeID: 1,
            Description: 1,
            Status: 1,
            Date: 1,
            "creatorDetails.Name": 1,
            Evidence: 1
            },
        },
      ]).toArray();

      return new Response(JSON.stringify(disputes), { status: 200 });
    }
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


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

  const { status, resolutionAction } = await request.json(); 

  if (!status || !resolutionAction) {
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
        $set: { Status: status, ResolutionAction: resolutionAction },
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
