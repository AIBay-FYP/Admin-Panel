import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req) {
  try {
    const db = await connectToDatabase();

    // Fetch all transactions with detailed data from related collections
    const transactions = await db.collection('Payment').aggregate([
      {
        $lookup: {
          from: 'Bookings',
          localField: 'BookingID',
          foreignField: '_id',
          as: 'bookingDetails',
        },
      },
      { $unwind: { path: '$bookingDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'Listings',
          localField: 'bookingDetails.ListingID',
          foreignField: '_id',
          as: 'listingDetails',
        },
      },
      { $unwind: { path: '$listingDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'User',
          localField: 'bookingDetails.ConsumerID',
          foreignField: '_id',
          as: 'consumerDetails',
        },
      },
      { $unwind: { path: '$consumerDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'User',
          localField: 'listingDetails.ProviderID',
          foreignField: '_id',
          as: 'providerDetails',
        },
      },
      { $unwind: { path: '$providerDetails', preserveNullAndEmptyArrays: true } },
      {
        $project: {
            transactionId: 1,
            "PaymentID": 1,
            "Amount": 1,
            "Timestamp": 1,
            "Status": 1,
            "providerDetails.Name": 1,
            "consumerDetails.Name": 1,
            "listingDetails.Title": 1
        }
        
      },
    ]).toArray();

    return new Response(
      JSON.stringify({ transactions }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
