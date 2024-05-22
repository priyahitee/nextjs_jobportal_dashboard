import { connectDB } from "@/lib/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest) {
  try {
    const res = await validateJWT(request);
    const reqBody = await request.json();
    const updatedUser = await User.findByIdAndUpdate(reqBody._id, reqBody, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      throw new Error("No User Found!");
    }
    return NextResponse.json({
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 403 }
    );
  }
}

