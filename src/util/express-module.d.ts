import { Request } from "express";
import { IUserDocument } from "../model/User";

declare module "express-serve-static-core" {
  export interface IRequest extends Request {
    user?: IUserDocument;
  }
}
