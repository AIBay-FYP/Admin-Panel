import { connectToDatabase } from "@/lib/mongodb";
import { formatDate } from "@/utiks/formatDate";
import { ObjectId } from "mongodb";


export async function GET() {
    try {
        const db = await connectToDatabase();
        const logcollection = db.collection('ComplianceLog');
        const providercollection = db.collection('User');
        const listingcollection = db.collection('listings');
        const logs = await logcollection
        .aggregate([
          {
            $addFields: {
              sortOrder: {
                $cond: {
                  if: { $eq: ["$Status", "Rejected"] },
                  then: 1, // Set a higher sort order for "Block permanently"
                  else: 0, // Lower sort order for others
                },
              },
            },
          },
          {
            $sort: {
              sortOrder: 1, // Sort by the custom `sortOrder` field
              _id: -1, // Then sort in reverse order by `_id`
            },
          },
        ])
        .toArray();
              
        const results = [];
        
        for (const log of logs) {
            const listing = await listingcollection.findOne(
                { _id: log.ListingID },
                { projection: { Title: 1, ProviderID: 1, DatePosted: 1 } }
            );
            
            if (listing) {
                const provider = await providercollection.findOne(
                    { _id: listing.ProviderID },
                    { projection: { Name: 1 } }
                );
                
                if (provider) {
                    results.push({
                        ...log,
                        LastReviewed: formatDate(log.LastReviewed),
                        ServiceName: listing.Title,
                        ProviderName: provider.Name,
                        ListingDate: formatDate(listing.DatePosted),
                    });
                }
            }
        }
        
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: "An error occurred while processing your request." }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}




export async function PUT(req) {
    const db = await connectToDatabase();
    const complianceLog = db.collection("ComplianceLog");
  
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
      const result = await complianceLog.updateOne(
        { _id: objectId },
        {
          $set: { Status: status },
        }
      );
  
      if (result.modifiedCount === 0) {
        return new Response(
          JSON.stringify({ message: "Status not found or not updated" }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ message: "Status updated successfully" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating feedback:", error);
      return new Response(
        JSON.stringify({ message: "Error updating feedback" }),
        { status: 500 }
      );
    }
  }