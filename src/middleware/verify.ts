import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import config from "../repository/config";

export const verifyToken = (req: Request, res: Response, next: NextFunction)=> {
    if (!req.cookies) {
        return res.status(401).json({error: "No cookie"})
    }
    const {token} = req.cookies
    if (!token) {
        return res.status(401).json({error: "Unauthorized"})
    }
    const decodedData = jwt.verify(token, config.secret)
    next()
}