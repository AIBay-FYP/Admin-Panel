import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { generatePassword } from "@/utiks/generatePassword";
import { clerkClient } from "@clerk/nextjs/server";

// GET function to fetch existing moderators
export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("User");

    // Query to fetch all users except those with RoleType as "Consumer" or "Provider"
    const moderators = await collection
      .find({ RoleType: { $nin: ["Consumer", "Provider"] } })
      .toArray();

    return NextResponse.json(moderators, { status: 200 });
  } catch (error) {
    console.error("Error fetching moderators:", error);
    return NextResponse.json(
      { message: "Failed to fetch moderators." },
      { status: 500 }
    );
  }
}

// POST function to register a new moderator
export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { Name, Email, ContactNumber, RoleType, Location, CNIC, ApprovedBy } = body;

    // Validate required fields
    if (!Name || !Email || !ContactNumber || !RoleType || !Location) {
      console.error("Missing required fields in the request body:", body);
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }

    // Generate a secure password
    const generatedPassword = generatePassword();
    console.log("Generated Password:", generatedPassword);

    // Connect to the MongoDB database
    const db = await connectToDatabase();
    const collection = db.collection("User");

    // Get the total user count to generate the next UserID (e.g., U001, U002)
    const totalUsers = await collection.countDocuments();
    const UserID = `U${String(totalUsers + 1).padStart(3, "0")}`; // Incremented UserID, e.g., U001

    console.log("Sending Data to Clerk:", {
      emailAddress: [Email],
      password: generatedPassword,
      firstName: Name.split(" ")[0],
      lastName: Name.split(" ").slice(1).join(" "),
    });
    
    let clerkUser;
    // Create the user in Clerk
    try {
      // const clerkUser = await clerkClient.users.createUser({
      //   emailAddress: [Email],
      //   password: generatedPassword,
      //   firstName: Name.split(" ")[0],
      //   lastName: Name.split(" ").slice(1).join(" "),      
      //   publicMetadata: {
      //     role: RoleType ,
      //     UserID: ApprovedBy ,
      //   },
      // });

      const clerk = await clerkClient();
      clerkUser = await clerk.users.createUser({
        
        emailAddress: [Email],
          password: generatedPassword,
          firstName: Name.split(" ")[0],
          lastName: Name.split(" ").slice(1).join(" "),      
          publicMetadata: {
            role: RoleType ,
            UserID: ApprovedBy ,
          },
      });
    
      console.log("Clerk User Created:", clerkUser.id);
    } catch (clerkError) {
      console.error("Error creating user in Clerk:", JSON.stringify(clerkError, null, 2));
      return new Response(
        JSON.stringify({ error: "Failed to create user in Clerk.", details: clerkError.errors }),
        { status: 500 }
      );
    }
    

    // Create a new moderator document in MongoDB
    const newModerator = {
      UserID,
      // ClerkUserID: clerkUser.id, // Store Clerk's User ID
      Name,
      Email,
      ContactNumber,
      RoleType,
      Location,
      ProfilePicture: "https://www.w3schools.com/w3images/avatar2.png",
      ApprovedBy,
      CNIC,
      CreatedAt: new Date(),
    };

    console.log("New Moderator Document:", newModerator);

    // Insert the new moderator document into the User collection
    const result = await collection.insertOne(newModerator);

    // Return success response with Clerk User ID and generated password
    return new Response(
      JSON.stringify({
        message: "Moderator registered successfully",
        userID: result.insertedId,
        clerkUserID: clerkUser.id,
        password: generatedPassword, // Include password in response for frontend display
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering moderator:", error);
    return new Response(
      JSON.stringify({ error: "Failed to register moderator" }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { UserID, Name, Email, ContactNumber, RoleType, Location } = body;

    if (!UserID || !Name || !Email || !ContactNumber || !Location) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();  // Reuse the same connection
    const collection = db.collection("User");

    // Update the moderator's data
    const result = await collection.updateOne(
      { UserID },
      {
        $set: {
          Name,
          Email,
          ContactNumber,
          RoleType,
          Location,
          UpdatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return new Response(
        JSON.stringify({ message: "Moderator updated successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "No changes made or user not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating moderator:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update moderator" }),
      { status: 500 }
    );
  }
}