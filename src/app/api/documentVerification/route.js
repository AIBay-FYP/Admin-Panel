import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { formatDate } from "@/utiks/formatDate";
import { formatTime } from "@/utiks/formatTime";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const documentsCollection = db.collection("Documents");
    const listingsCollection = db.collection("Listings");
    const usersCollection = db.collection("User");

    const documents = await documentsCollection.find().toArray();

    const results = [];

    for (const document of documents) {
      const listing = await listingsCollection.findOne(
        { _id: new ObjectId(document.ServiceID) }
      );

      let verifiedByUserID = "N/A"; 
      if (document.VerifiedBy) {
        const verifiedByUser = await usersCollection.findOne(
          { _id: new ObjectId(document.VerifiedBy) },
        );
        verifiedByUserID = verifiedByUser?.UserID || "N/A";
      }

      if (listing) {
        const user = await usersCollection.findOne(
          { _id: new ObjectId(document.UserID) }
        );

        if (user) {
          results.push({
            ...document,
            LastReviewed: formatDate(document.Timestamp),
            ProviderName: user.Name || "N/A",
            Time: formatTime(document.Timestamp),
            ListingID: listing?.ListingID || "N/A",
            UserID: user?.UserID || "N/A",
            VerifiedBy: verifiedByUserID, // Add VerifiedBy UserID
            File: document.File || "#"
          });
        }
      }
    }

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}