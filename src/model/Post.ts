import mongoose from "mongoose";

interface Post {
  title: string;
  description: string;
  image: string;
}

const postSchema = new mongoose.Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<Post>("Post", postSchema);
export default Post;