import { connectToDatabase } from "@/lib/mongodb";

export async function PATCH(req, context) {
  try {
    const { params } = context;
    const id = params.id; // ✅ Properly accessed now

    const db = await connectToDatabase();

    console.log("Received Dispute ID:", id);

    if (!id) {
      console.error("Error: Dispute ID is undefined or missing");
      return new Response(JSON.stringify({ message: "Dispute ID is required" }), { status: 400 });
    }

    const { status, adminComment } = await req.json();
    console.log("Request Body:", { status, adminComment });

    const disputeUpdate = await db.collection("Dispute").findOneAndUpdate(
      { DisputeID: id },
      { $set: { Status: status, AdminComment: adminComment } },
      { returnDocument: "after" }
    );

    console.log("Dispute Update Result:", disputeUpdate);

    // 🛠️ Prevent crash if ContractID is missing
    const contractId = disputeUpdate?.value?.ContractID;

    if (status === "Resolved" && contractId) {
      const contractUpdate = await db.collection("Contract").findOneAndUpdate(
        { ContractID: contractId },
        { $set: { DisputeNature: "Resolved" } }
      );
      console.log("Contract Update Result:", contractUpdate);
    }

    // 📩 Notification
    if (disputeUpdate?.value?.CreatedBy) {
      const notification = {
        UserID: disputeUpdate.value.CreatedBy,
        Message: adminComment || "Your dispute has been updated.",
        Type: "Dispute",
        ReadStatus: false,
      };

      console.log("Notification Payload:", notification);

      const notificationResponse = await fetch(`/api/notificationPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      });

      console.log("Notification Response Status:", notificationResponse.status);
    }

    return new Response(JSON.stringify({ message: "Dispute updated", dispute: disputeUpdate.value }), { status: 200 });

  } catch (error) {
    console.error("Error in PATCH /api/disputes/[id]:", error);
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
