import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
const app = express();

//internal dependency
import authRoutes from "./routes/authentication";
import feedRoutes from "./routes/feeds";
import { IError } from "./util/types";

//env variables
const port: string = process.env.PORT!;
const connection: string = process.env.MONGO_CONNECTION!;

//CQRS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(authRoutes);
app.use(feedRoutes);

//error middleware
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error occured!", err);
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message;
  res.status(errStatus).json({
    error: errMessage,
  });
});

//connection
mongoose
  .connect(connection)
  .then(() => {
    const server = app.listen(port, () => {
      console.log("Server started...");
    });

    process.on("exit", server.close);
  })
  .catch((err) => console.log(err));
