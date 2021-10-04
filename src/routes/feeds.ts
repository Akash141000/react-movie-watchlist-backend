import express, { IRouterMatcher } from "express";
const Router = express.Router();

//internal dependency
import isAuth from "../middleware/jwtauth";
import {
  getPosts,
  getFavourites,
  postAddToFavourites,
  postRemoveFromFavourites,
  postCreatePost,
} from "../controller/feeds";

Router.get("/posts", isAuth, getPosts);

Router.get("/favourites", isAuth, getFavourites);

Router.post("/addPost", isAuth, postCreatePost);

Router.post("/addToFavourites", isAuth, postAddToFavourites);

Router.post("/removeFromFavourites", isAuth, postRemoveFromFavourites);

export default Router;
