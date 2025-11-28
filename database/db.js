import mongoose from "mongoose";
import 'dotenv/config'

console.log("mongodb uri👍",process.env.Db_url)
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Db_url, {
      dbName: "ChatbotYoutube",
    });

    console.log("Mongo db connected✅");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
