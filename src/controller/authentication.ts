import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User";
import { IError } from "../util/types";
import { IRequest } from "express-serve-static-core";

interface IAuthRequestBody {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
}

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as IAuthRequestBody;
    if (!(body.username && body.password)) {
      const err: IError = new Error("Invalid credentials!");
      err.status = 400;
      return next(err);
    }
    const username = body.username;
    const password = body.password;
    if (!username || !password) {
      throw new Error("No credentials Found");
    }
    const user = await User.findOne({ username: username });
    if (!user) {
      const error: IError = new Error("Bad credentials");
      error.status = 400;
      return next(error);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const err: IError = new Error("Invalid credentials!");
      err.status = 401;
      return next(err);
    }

    const tokenGenerated = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.JSON_TOKEN_SECRET!,
      { expiresIn: "1hr" }
    );
    if (!tokenGenerated) {
      const err: IError = new Error("Error while generating token1!");
      err.status = 500;
      return next(err);
    }
    res.status(200).json({ token: tokenGenerated, user: user._id });
  } catch (error) {
    next(error);
  }
};

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as IAuthRequestBody;
    if (
      !(body.email && body.username && body.password && body.confirmPassword)
    ) {
      const err: IError = new Error("Invalid credentials!");
      err.status = 400;
      return next(err);
    }
    const email = body.email;
    const username = body.username;
    const password = body.password;
    const confirmPassword = body.confirmPassword!;

    if (password !== confirmPassword) {
      return res
        .status(401)
        .json({ message: "Please confirm password again." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (hashedPassword) {
      const user = await new User({
        email: email,
        username: username,
        password: hashedPassword,
        favourites: { posts: [] },
      });
      const saved = await user.save();
      if (saved) {
        res.status(200).json({ message: "New user created" });
      }
      if (!saved) {
        const err: IError = new Error("Unable to create new user");
        err.status = 500;
        return next(err);
      }
    }
  } catch (error) {
    next(error);
  }
};
