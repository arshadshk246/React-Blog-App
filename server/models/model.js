import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  image: String,
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
