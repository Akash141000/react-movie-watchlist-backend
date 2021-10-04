import express, { NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { IError, IRequest } from "../util/types";

const jsonToken = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    let token: string;
    if (req.get("Authorization")) {
      token = req.get("Authorization")!;
    } else {
      throw new Error("No token found");
    }

    let decodedToken: { email: string; userId: string } | any;

    decodedToken = jwt.verify(token!, process.env.JSON_TOKEN_SECRET!);

    if (!decodedToken) {
      const err: IError = new Error("Not authenticated");
      err.status = 404;
      throw err;
    }
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (error) {
    next(error);
  }
};

export default jsonToken;
