import express, { NextFunction, Request, Response } from "express";
import { Server } from "http";
import mongoose from "mongoose";
import { exit } from "process";
const app = express();

//internal dependency
import feedRoutes from "./routes/feeds";
import { IError } from "./util/types";

//env variables
const port: string = process.env.PORT!;
const connection: string = process.env.MONGO_CONNECTION!;

//
app.use(express.urlencoded());
app.use(express.json());


//routes
app.use(feedRoutes);

//error middleware
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  console.log("Error occured!", err);
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message;
  res.status(500).json({
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
