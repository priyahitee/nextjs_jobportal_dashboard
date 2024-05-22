import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.mongo_db!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connection Successfull");
    });

    connection.on("error", (error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}