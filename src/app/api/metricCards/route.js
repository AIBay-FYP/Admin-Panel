import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        // Connect to the database
        const db = await connectToDatabase();
        const usercollection = db.collection('User');
        const paycollection = db.collection('Payment');
        const listcollection = db.collection('listings');

        // Fetch the counts
        const users = await usercollection.countDocuments();
        const transaction = await paycollection.countDocuments();
        const listings = await listcollection.countDocuments();

        // Return the counts in a structured response
        return new Response(
            JSON.stringify({
                usersCount: users,
                transactionsCount: transaction,
                listingsCount: listings,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching counts:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch counts' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
