import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connect = async ()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("DB is connected");
    
}


