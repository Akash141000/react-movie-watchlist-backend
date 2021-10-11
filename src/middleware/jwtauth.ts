import express, { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { IError, jwtPayload } from "../util/types";
import { IRequest } from "express-serve-static-core";

export const isAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.get("Authorization")) {
      throw new Error("No token found");
    }
    const token = req.get("Authorization") as string;

    const decodedToken: unknown = jwt.verify(
      token,
      process.env.JSON_TOKEN_SECRET!
    );

    if (!decodedToken) {
      const err: IError = new Error("Not authenticated");
      err.status = 404;
      throw err;
    }
    const user = await User.findById((decodedToken as jwtPayload).userId);
    if (!user) {
      throw new Error("User not found!");
    }
    req.user = user;
    const path = req.route.path as string;
    if (path === "/auth") {
      res.status(200).json({ auth: true });
    }
    next();
  } catch (error) {
    next(error);
  }
};
