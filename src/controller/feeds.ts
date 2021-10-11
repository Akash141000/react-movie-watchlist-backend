import { NextFunction, Request, Response } from "express";
import Post, { IPost } from "../model/Post";
import User, { IUser, IUserDocument } from "../model/User";
import { IRequest } from "express-serve-static-core";
import { Types } from "mongoose";
import { IError } from "../util/types";

export const getPosts = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allposts = await Post.find().lean();
    const user: IUserDocument | null = await User.findById(req.user);
    if (!user) {
      const err: IError = new Error("Something went wrong!");
      err.status = 500;
      return next(err);
    }
    let transformedPosts: any[] = [];
    const Favourties: Types.ObjectId[] = await user.favourites.posts;
    allposts.forEach((post) => {
      let isFav = false;
      Favourties.forEach((favId) => {
        if (post._id.toString() === favId.toString()) {
          isFav = true;
        }
      });
      transformedPosts.push({ ...post, isFav: isFav });
    });

    res.status(200).json({ posts: transformedPosts });
  } catch (error) {
    next(error);
  }
};

export const getFavourites = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUserDocument = await (req.user as IUserDocument).populate(
      "favourites.posts"
    );
    const allFav: IPost[] = await user.favourites.posts;

    res.status(200).json(allFav);
  } catch (error) {
    next(error);
  }
};

export const postCreatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const title = req.body.title as string;
    const description = req.body.description as string;
    const image = req.body.imageUrl as string;
    const post = new Post({
      title: title,
      description: description,
      image: image,
    });

    const saved = await post.save();
    if (saved) {
      res.status(201).json({
        message: "Post created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const postAddToFavourites = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = req.body.post as IPost;
    const postObj = { ...post };
    const postFound: IPost | null = await Post.findById(postObj._id);
    if (!postFound) {
      throw new Error("Something went wrong!");
    }
    if (!req.user) {
      throw new Error("No user found!");
    }
    req.user.addToFav(postFound).then(() => {
      res.status(200).json({ message: "Added Successfully" });
    });
  } catch (error) {
    next(error);
  }
};

export const postRemoveFromFavourites = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = req.body.post as IPost;
    const post = await Post.findById(postId._id);
    if (!post) {
      throw new Error("Something went wrong!");
    }
    if (!req.user) {
      throw new Error("No user found!");
    }
    req.user.removeFromFav(post).then(() => {
      res.status(200).json({ message: "Removed Successfully" });
    });
  } catch (error) {
    next(error);
  }
};
