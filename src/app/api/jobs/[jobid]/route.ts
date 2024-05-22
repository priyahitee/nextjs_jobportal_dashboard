import { connectDB } from "@/lib/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
// Notes:NextRequest class, which represents the incoming HTTP request. It provides access to various properties and methods related to the request, such as headers, query parameters, and the request body.

export async function PUT(request: NextRequest, { params }: any ) {
  try {
    await validateJWT(request);
    const reqBody = await request.json();
    const updatedJob = await Job.findByIdAndUpdate(params.jobid, reqBody, {
      new: true,
      runValidators: true,
    });
    return NextResponse.json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: any) {
  try {
    await validateJWT(request);
    const job = await Job.findById(params.jobid).populate("user");
    return NextResponse.json({
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
      await validateJWT(request);
      const job = await Job.findByIdAndDelete(params.jobid);
      return NextResponse.json({
        message: "Job Deleted successfully",
        data: job,
      });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
