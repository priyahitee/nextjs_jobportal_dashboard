import { connectDB } from "@/lib/dbConfig"
import { validateJWT } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: any) {
    try {
        await validateJWT(request);
        const userInfo: any= await User.findById(params.userid);
        if (!userInfo) {
            throw new Error("No user found");
          }
        return NextResponse.json({
          message: "User data fetched successfully",
          data: userInfo,
        });
      } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
}