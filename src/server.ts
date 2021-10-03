import express, { NextFunction } from "express";
import mongoose from "mongoose";
const app = express();

//internal dependency
import feedRoutes from "./routes/feeds";

//env variables
const port: string = process.env.PORT!;
const connection: string = process.env.MONGO_CONNECTION!;

//routes
app.use(feedRoutes);
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
