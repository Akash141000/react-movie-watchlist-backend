import { NextFunction, Request, Response } from "express";
import Post, { IPost } from "../model/Post";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.status(200).json(posts);
    }
  } catch (error) {
    next(error);
  }
};

export const getFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const post = req.body.post as IPost;
  const postObj = {...post};
  const postFound = await Post.findById(postObj._id);
  if(postFound){
    //IMPLEMENT
  }
};

export const postRemoveFromFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.body.post as IPost;
  const post = await Post.findById(postId._id);
  if(post){
    //
  }
  //TODO:
};
