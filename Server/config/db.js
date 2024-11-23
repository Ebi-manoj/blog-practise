import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Datbase Connected:${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
