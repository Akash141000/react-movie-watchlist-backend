import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User";
import { IError, IRequest } from "../util/types";

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
    const username = (req.body as IAuthRequestBody).username;
    const password = (req.body as IAuthRequestBody).password;

    const user = await User.findOne({ username: username });
    if (user) {
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
      res.status(200).json({ token: tokenGenerated });
    }
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
    const email = (req.body as IAuthRequestBody).email!;
    const username = (req.body as IAuthRequestBody).username;
    const password = (req.body as IAuthRequestBody).password;
    const confirmPassword = (req.body as IAuthRequestBody).confirmPassword!;

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
