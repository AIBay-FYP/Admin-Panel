import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET method handler
export async function GET(req) {
  const db = await connectToDatabase(); // Using the connectToDatabase function to establish connection
  const feedbacksCollection = db.collection("Feedbacks");
  const usersCollection = db.collection("User");

  try {
    const feedbacks = await feedbacksCollection.find().toArray();

    const feedbacksWithRole = await Promise.all(feedbacks.map(async (feedback) => {
      const user = await usersCollection.findOne({ _id: new ObjectId(feedback.User.$oid) });
      return {
        ...feedback,
        roleType: user?.RoleType || "N/A", // Adding the roleType from the User collection
      };
    }));
    return new Response(JSON.stringify(feedbacksWithRole), { status: 200 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return new Response(JSON.stringify({ message: "Error fetching feedbacks" }), { status: 500 });
  }
}

// POST method handler
export async function POST(req) {
  const db = await connectToDatabase();
  const feedbacksCollection = db.collection("Feedbacks");

  try {
    const { feedbackID, status, date } = await req.json(); // Using the .json() method on the request object

    if (!feedbackID || !status || !date) {
      return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
    }

    const result = await feedbacksCollection.updateOne(
      { FeedbackID: feedbackID },
      {
        $set: { Status: status, Date: date },
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: "Feedback not found or not updated" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Feedback updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error updating feedback:", error);
    return new Response(JSON.stringify({ message: "Error updating feedback" }), { status: 500 });
  }
}
