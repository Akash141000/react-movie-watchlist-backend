import { Schema, model, Types, Document } from "mongoose";
import { IPost } from "./Post";

export interface IUser {
  email: string;
  username: string;
  password: string;
  favourites: { posts: any[] };
}

export interface IUserDocument extends IUser, Document {
  addToFav: (post: IPost) => Promise<void>;
  removeFromFav: (post: IPost) => Promise<void>;
}

const userSchema = new Schema<IUserDocument>({
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
        type: Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
  },
});

userSchema.methods.addToFav = function (post: IPost) {
  let updatedPosts: any[] = [];
  updatedPosts = [...this.favourites.posts];
  const postIndex = updatedPosts.findIndex((fav) => {
    return fav.toString() === post._id.toString();
  });
  if (postIndex >= 0) {
    return this.save();
  }

  updatedPosts.push(post);
  this.favourites.posts = updatedPosts;
  return this.save();
};

userSchema.methods.removeFromFav = function (post: IPost) {
  let updatedPosts = [];
  updatedPosts = [...this.favourites.posts];
  updatedPosts = updatedPosts.filter((fav) => {
    return fav.toString() !== post._id.toString();
  });
  this.favourites.posts = updatedPosts;
  return this.save();
};

const user = model<IUserDocument>("User", userSchema);

export default user;
