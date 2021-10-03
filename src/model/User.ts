import mongoose from "mongoose";
import Post from "./Post";

interface User {
  email: string;
  username: string;
  password: string;
  favourites: { posts: [Post] };
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: {
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
  },
});
