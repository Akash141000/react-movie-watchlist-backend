import express, { NextFunction } from "express";
import mongoose from "mongoose";

const app = express();

const port: string = process.env.PORT!;
const connection: string = process.env.MONGO_CONNECTION!;

//routes

//error middleware

//connection
mongoose
  .connect(connection)
  .then(() => {
    app.listen(port, () => {
      console.log("Server started...");
    });
  })
  .catch((err) => console.log(err));
