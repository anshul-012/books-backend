import mongoose from "mongoose";

const connectDB = async()=>{

 try {
       const {connection} = await mongoose.connect(process.env.MONGO_DB_URI)
       console.log(`mongo db in connected on host : ${connection.host}`)
      
 } catch (error) {
    console.log(`Error while connecting MONGO DB: ${error}`)
 }
}

export default connectDB;