import express, { NextFunction, Request, Response } from "express";
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
app.use((err:errorType,req:Request,res:Response,next:NextFunction)=>{
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message;
  res.status(500).json({
    error: errMessage,
  })
});

//connection
mongoose
  .connect(connection)
  .then(() => {
    app.listen(port, () => {
      console.log("Server started...");
    });
  })
  .catch((err) => console.log(err));
