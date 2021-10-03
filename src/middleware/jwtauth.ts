import express, { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { IError, IRequest } from "../util/types";

const jsonToken = async (req: IRequest, res: Response, next: NextFunction) => {
  let token: string;
  if (req.get("Authorization")) {
    token = req.get("Authorization")!;
  } else {
    throw new Error("No token found");
  }

  let decodedToken :any;
  try {
    decodedToken = jwt.verify(token!, "userAuthenticationToken");
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    const err: IError = new Error("Not authenticated");
    err.status = 404;
    throw err;
  }
  req.user = await User.findById(decodedToken.userId!);
  // .then((user) => {
  //   console.log("user", user);
  //   req.user = user;
  // })
  //.catch((err) => console.log(err));
  next();
};

export default jsonToken;
