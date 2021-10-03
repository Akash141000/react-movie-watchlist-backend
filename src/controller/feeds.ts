import { NextFunction, Request, Response } from "express";
import Post from "../model/Post";

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  console.log("getPosts");
};

export const getFavourites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
    }catch(error){
        console.log(error);
        next(error);
    }
};

export const postAddPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log('logging..');
};

export const postAddToFavourites = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log('logging..');
};

export const postRemoveFromFavourites = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log('logging..');
};
