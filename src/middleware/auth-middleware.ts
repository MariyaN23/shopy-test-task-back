import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import config from "../repository/config";
import {usersCollection} from "../repository/db";
import {ObjectId} from "mongodb";

interface CustomRequest extends Request {
    user?: any
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const {token} = req.cookies
        if (!token) {
            return res.status(401).send({message: 'Unauthorized'})
        }
        const decodedData = jwt.verify(token, config.secret) as JwtPayload
        req.user = await usersCollection.findOne({_id: new ObjectId(decodedData.id)})
        next()
    } catch (error) {
        return res.status(403).send(`Error ${error}`)
    }
}