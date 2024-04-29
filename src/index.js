import app from "./app.js";
import { config } from "dotenv";
import connectDB from "./dataBase/connect-db.js";
import { v2 as cloudinary } from "cloudinary";

config({
  path: "./.env",
});
const port = process.env.PORT || 3000;

           
cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server in running on port : ", port);
    });
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTING MONGO DB : ".err);
    g;
  });
