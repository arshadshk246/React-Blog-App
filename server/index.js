import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// Used when adding new data related to posts
import Post from "./models/model.js";
import posts from "./data/data.js";
//////////////////////////////////////////////////
import galleryRoutes from "./routes/gallery.js";

// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));

// ROUTES

app.use("/gallery", galleryRoutes);
// Full Route Becomes http://localhost:1337/gallery/posts

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // ADD DATA ONE TIME ONLY OR AS NEEDED
    // await mongoose.connection.db.dropDatabase();

    // Post.insertMany(posts); // Sample data
    ////////////////////////////////////////////
  })
  .catch((error) => console.log(`${error} did not connect`));
