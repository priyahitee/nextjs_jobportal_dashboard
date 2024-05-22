import { connectDB } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
connectDB();

// Checking whether end points working or not
// export async function GET(request: NextRequest) {
//     return NextResponse.json({
//         message: "Users/register api accessed with GET method!"
//     })
// }

// export async function POST(request: NextRequest) {
//     return NextResponse.json({
//         message: "Users/register api accessed with POST method!"
//     })
// }

// export async function PUT(request: NextRequest) {
//     return NextResponse.json({
//         message: "Users/register api accessed with PUT method!"
//     })
// }

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // check if user already exists
    const user = await User.findOne({ email: reqBody.email });
    if (user) {
      throw new Error("User already Exists!");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);
    reqBody.password = hashedPassword;

    // Creating new user
    await User.create(reqBody);
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


