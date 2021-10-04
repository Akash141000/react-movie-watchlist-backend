import express from "express";
const Router = express.Router();
import { postLogin, postSignup } from "../controller/authentication";

Router.post("/postLogin", postLogin);

Router.post("/postSignup", postSignup);

export default Router;
