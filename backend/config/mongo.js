import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn=mongoose.connect(ENV_VARS.MONGO_URI)   //connect to DB
        console.log("MONGO CONNECTED" + conn)
    } catch (error) {
        console.log("ERROR : " + error)
        process.exit(1)
    }
}

// We will store users in the DB