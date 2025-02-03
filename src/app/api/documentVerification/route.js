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

    // Fetch all documents
    const documents = await documentsCollection.find().toArray();
    const results = [];

    for (const document of documents) {
      // Fetch related listing
      const listing = await listingsCollection.findOne(
        { _id: new ObjectId(document.ServiceID) }
      );

      // Fetch user who submitted the document
      const user = await usersCollection.findOne(
        { _id: new ObjectId(document.UserID) }
      );

      // Fetch user who verified the document (if any)
      let verifiedByUserID = "N/A"; 
      if (document.VerifiedBy) {
        const verifiedByUser = await usersCollection.findOne(
          { _id: new ObjectId(document.VerifiedBy) },
        );
        verifiedByUserID = verifiedByUser?.UserID || "N/A";
      }

      // Prepare final document data
      if (user) {
        results.push({
          ...document,
          LastReviewed: formatDate(document.Timestamp),
          ProviderName: user.Name || "N/A",
          Time: formatTime(document.Timestamp),
          ListingID: listing?.ListingID || "N/A",
          UserID: user?.UserID || "N/A",
          VerifiedBy: verifiedByUserID, 
          File: document.File || "#",
          status: document.VerificationStatus,
          sortOrder: document.VerificationStatus === "Approved" ? 1 : 0, // Sorting field
        });
      }
    }

    results.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder; // Sort by approval status
      }
      return b._id.toString().localeCompare(a._id.toString()); // Sort by _id descending
    });

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

export async function PUT(req) {
  const db = await connectToDatabase();
  const documentsCollection = db.collection("Documents");

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
    const result = await documentsCollection.updateOne(
      { _id: objectId },
      {
        $set: { VerificationStatus: status }, // Update the VerificationStatus field
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Document not found or not updated" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Verification status updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating verification status:", error);
    return new Response(
      JSON.stringify({ message: "Error updating verification status" }),
      { status: 500 }
    );
  }
}
