import mongoose from "mongoose";
import configData from "./config";

export const connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(configData.mongodb.uri);
    console.log("CONNECTED TO 'IWIICK DB'");
  } catch (error) {
    console.log("ERROR CONNECTING TO 'IWIICK DB' :: ", error);
  }
};
