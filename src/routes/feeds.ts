import express from "express";
const Router = express.Router();

//internal dependency
import {
  getPosts,
  getFavourites,
  postAddToFavourites,
  postRemoveFromFavourites,
  postCreatePost,
} from "../controller/feeds";

Router.get("/posts", getPosts);

Router.get("/favourites", getFavourites);

Router.post("/addPost", postCreatePost);

Router.post("/addToFavourites", postAddToFavourites);

Router.post("/removeFromFavourites", postRemoveFromFavourites);

export default Router;
