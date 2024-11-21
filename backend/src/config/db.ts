import mongoose from "mongoose";

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI!);
    const url = `${connection.host}:${connection.port}`;
    console.log(`MongoDB conectado: ${url}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
