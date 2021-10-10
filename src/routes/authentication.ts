import express from "express";
const Router = express.Router();
import { postLogin, postSignup } from "../controller/authentication";
import {isAuth} from "../middleware/jwtauth";

 Router.get("/auth",isAuth);

Router.post("/postLogin", postLogin);

Router.post("/postSignup", postSignup);

export default Router;
