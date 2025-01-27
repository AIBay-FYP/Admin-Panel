import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
  const db = await connectToDatabase();
  const url = new URL(request.url);
  const contractId = url.searchParams.get("ContractID"); // Get ContractID if provided

  try {
    if (contractId) {
      // Fetch specific contract details
      const query = { ContractID: contractId }; // Match the specific contract

      const contract = await db.collection("Contract").aggregate([
        { $match: query }, // Match the specific contract
        {
          $lookup: {
            from: "Bookings",
            localField: "BookingID",
            foreignField: "_id",
            as: "bookingDetails",
          },
        },
        { $unwind: { path: "$bookingDetails", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "Listings",
            localField: "bookingDetails.ListingID",
            foreignField: "_id",
            as: "listingDetails",
          },
        },
        { $unwind: { path: "$listingDetails", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "User",
            localField: "bookingDetails.ConsumerID",
            foreignField: "_id",
            as: "consumerDetails",
          },
        },
        { $unwind: { path: "$consumerDetails", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "User",
            localField: "listingDetails.ProviderID",
            foreignField: "_id",
            as: "providerDetails",
          },
        },
        { $unwind: { path: "$providerDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ContractID: 1,
            "listingDetails.Photos": 1, // Service images
            "listingDetails.Price": 1, // Price
            "listingDetails.Description": 1, // Service description
            "consumerDetails.Name": 1, // Consumer name
            "providerDetails.Name": 1, // Provider name
            "NatureOfDispute": "$Dispute.Nature", // Nature of dispute, if stored
            DocumentURL: 1, // Contract file URL, if available
          },
        },
      ]).toArray();

      // If no contract is found, return 404
      if (!contract || contract.length === 0) {
        return new Response(
          JSON.stringify({ error: "Contract not found" }),
          { status: 404 }
        );
      }

      return new Response(JSON.stringify(contract[0]), { status: 200 });
    } else {
      // Fetch all contracts (previous functionality)
      const contracts = await db.collection("Contract").aggregate([
        {
          $lookup: {
            from: "Bookings",
            localField: "BookingID",
            foreignField: "_id",
            as: "bookingDetails",
          },
        },
        { $unwind: { path: "$bookingDetails", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "Listings",
            localField: "bookingDetails.ListingID",
            foreignField: "_id",
            as: "listingDetails",
          },
        },
        { $unwind: { path: "$listingDetails", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "User",
            localField: "bookingDetails.ConsumerID",
            foreignField: "_id",
            as: "consumerDetails",
          },
        },
        { $unwind: { path: "$consumerDetails", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "User",
            localField: "listingDetails.ProviderID",
            foreignField: "_id",
            as: "providerDetails",
          },
        },
        { $unwind: { path: "$providerDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ContractID: 1,
            "consumerDetails.Name": 1,
            "providerDetails.Name": 1,
            "listingDetails.Title": 1,
            Timestamp: 1,
            Status: 1,
          },
        },
      ]).toArray();

      return new Response(JSON.stringify(contracts), { status: 200 });
    }
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
