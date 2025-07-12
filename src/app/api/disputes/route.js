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
            Title: 1,
            Evidence: 1,
            AdminComment: 1, 
            "creatorDetails.Name": 1,
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
            Title: 1,
            Evidence: 1,
            AdminComment: 1, 
            "creatorDetails.Name": 1,
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



