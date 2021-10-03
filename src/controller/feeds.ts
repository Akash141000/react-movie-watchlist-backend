import { NextFunction, Request, Response } from "express";

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  console.log("getPosts");
};

export const getFavourites = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("getFavourites");
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
