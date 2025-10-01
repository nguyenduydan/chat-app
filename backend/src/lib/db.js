import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connc = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected: ", connc.connection.host);
    } catch (error) {
        console.error("Error connection to MongoDB: ", error);
        process.exit(1); //1 status code means fail, 0 means success
    }
};
