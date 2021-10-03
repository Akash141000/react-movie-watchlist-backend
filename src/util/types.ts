import { Request } from "express";
import { IUserDocument } from "../model/User";

export interface IError extends Error{
    status?:number
}


export interface IRequest extends Request{
    user?: any
}