import express from "express";
import Post from "../models/model.js";
import multer from "multer";
import fs from "fs";
const router = express.Router();

// Read
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Search
// router.get("/posts/:id", async (req, res) => {
//   try {
//     const posts = await Post.findOne(req.params.id);
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

// Create

// Dealing with the image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

const upload = multer({ storage: storage });

router.post("/posts", upload.single("image"), async (req, res) => {
  const { title, description } = req.body; // Extract other form fields
  const imageFileName = req.file.filename; // Get the filename from req.file
  const newPost = new Post({ image: imageFileName, title, description });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// delete
router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).send({ message: "Post not found" });
    }

    // Deleting from the uploads folder
    const imagePath = `uploads/${deletedPost.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log("Error deleting image: ", err);
      }
    });

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/posts/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Update the image only if req.file exists, otherwise keep the existing image
    const updateData = {
      title,
      description,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }
    console.log(updateData, req.file);
    console.log(updateData.image);
    updateData.description = "(edited) " + updateData.description;
    const update = await Post.findByIdAndUpdate(id, updateData, { new: true });

    res.status(201).json(update);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
