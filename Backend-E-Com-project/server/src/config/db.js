// cd /d "D:\satya coding files\MongoDb software\bin"
// mongod --dbpath "D:\satya coding files\MongoDb software\data"

import mongoose from "mongoose";
import config from "./config.js";

const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    throw new Error("connection string error!", { cause: error });
  }
};

export default connectDb;
