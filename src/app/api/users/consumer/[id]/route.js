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

    // Count the number of reviews for the consumer
    const reviewCount = await ReviewCollection.countDocuments({
      ReviewerID: new ObjectId(id),
    });

    // Fetch all bookings where ConsumerID matches the given id
    const userBookings = await BookingCollection
      .find(
        { ConsumerID: new ObjectId(id) }, // Find all bookings for this consumer
        { projection: { ListingID: 1, Status: 1 } } // Only fetch ListingID and Status fields
      )
      .toArray();

    if (userBookings.length === 0) {
      return new Response(
        JSON.stringify({ reviewCount, bookings: [], listings: [] }),
        { status: 200 }
      );
    }

    // Filter out only approved bookings
    const approvedBookings = userBookings.filter(
      (booking) => booking.Status === "Approved"
    );

    const servicesAvailed = approvedBookings.length;

    // Map the approved bookings to their respective ListingIDs
    const listingIds = approvedBookings
      .map((booking) => booking.ListingID)
      .filter((id) => ObjectId.isValid(id)) // Ensure ListingIDs are valid
      .map((id) => new ObjectId(id));

    if (listingIds.length === 0) {
      return new Response(
        JSON.stringify({
          reviewCount,
          listings: [],
          servicesAvailable: approvedBookings.length,
          servicesAvailed: servicesAvailed,
        }),
        { status: 200 }
      );
    }

    // Fetch all listings that match the listingIds
    const listings = await ListingCollection
      .find({ _id: { $in: listingIds } })
      .toArray();

    // Return the data, including servicesAvailed and servicesAvailable
    return new Response(
      JSON.stringify({
        reviewCount,
        bookings: approvedBookings,
        listings,
        servicesAvailable: userBookings.length, // Total number of bookings
        servicesAvailed,
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
