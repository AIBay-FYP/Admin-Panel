import { connectToDatabase } from "@/lib/mongodb"; 
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params; 
    console.log("IDDD", id);

    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "Invalid User ID" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const ReviewCollection = db.collection("Review");
    const BookingCollection = db.collection("Bookings");
    const ListingCollection = db.collection("listings");

    const reviewCount = await ReviewCollection.countDocuments({
      ReviewerID: new ObjectId(id),
    });

    // Fetch all listings where ProviderID matches the given id
    const listings = await ListingCollection
      .find({ ProviderID: new ObjectId(id) }) // Match listings where ProviderID is the provided id
      .toArray();

    if (listings.length === 0) {
      return new Response(
        JSON.stringify({ reviewCount, listings: [], bookings: [], serviceApprovalRate: 0 }),
        { status: 200 }
      );
    }

    // Extract all the ListingIDs from the fetched listings
    const listingIds = listings.map((listing) => listing._id);

    // Fetch bookings related to these listings, retrieving the fields: Status, Price, EscrowStatus
    const userBookings = await BookingCollection
      .find(
        { ListingID: { $in: listingIds } }, // Match bookings where ListingID is in the list of fetched listingIds
      )
      .toArray();

    if (userBookings.length === 0) {
      return new Response(
        JSON.stringify({ reviewCount, listings, bookings: [], serviceApprovalRate: 0 }),
        { status: 200 }
      );
    }

    // Calculate the total number of bookings (available bookings)
    const totalBookings = userBookings.length;

    // Calculate the number of bookings with Status 'Approved' or 'Completed'
    const approvedOrCompletedBookings = userBookings.filter(
      (booking) => booking.Status === "Confirmed" || booking.Status === "Completed"
    ).length;

    // Calculate the service approval rate
    const serviceApprovalRate = totalBookings > 0 
      ? (approvedOrCompletedBookings / totalBookings) * 100 
      : 0;

    return new Response(
      JSON.stringify({
        reviewCount,
        listings,
        bookings: userBookings,
        serviceApprovalRate,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
