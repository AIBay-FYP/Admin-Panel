import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
 
  try {
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
            from: "listings",
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
      ]).toArray();

      return new Response(JSON.stringify(contracts), { status: 200 });
    
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}