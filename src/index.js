import dotenv from "dotenv";
dotenv.config();



// DEBUG: Check if env vars are loaded
console.log("=== Environment Variables Check ===");
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);
console.log("PORT:", process.env.PORT);
console.log("===================================");
import connectDb from "./db/index.js";
import { app } from "./app.js";


connectDb()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
  })
})
.catch((err)=>{
    console.log("MongoDB connection failed",err)
})
