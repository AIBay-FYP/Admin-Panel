import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { UserID, Message, Type, ReadStatus} = await req.json();

    const db = await connectToDatabase();
    const collection = db.collection('Notifications');
    const count = await collection.countDocuments();
    const notificationID = `N00${count + 1}`;


    const notification = {
      NotificationID: notificationID,
      UserID: new ObjectId(UserID), 
      Message,
      Type, 
      ReadStatus,
      Timestamp: new Date(), 
    };

    const result = await collection.insertOne(notification);
    return new Response(JSON.stringify({ message: 'Notification created successfully', notificationID: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create notification' }), {
      status: 500,
    });
  }
}
