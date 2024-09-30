import {usersCollection, UserType} from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config";
import {ObjectId} from "mongodb";

const generateAccessToken = (id: ObjectId) => {
    const payload = {
        id
    }
    const accessToken = jwt.sign(payload, config.secret, { expiresIn: "24h" })
    return accessToken
};

export const authRepository = {
    async registerUser(id: number, username: string, password: string): Promise<UserType> {
        const foundUser = await usersCollection.findOne({username})
        if (foundUser) {
            throw new Error(`User with username ${username} already exist`)
        } else {
            const newUser: UserType = {id, username, password}
            await usersCollection.insertOne(newUser)
            return newUser
        }
    },
    async loginUser(username: string, password: string): Promise<{token: string, userId: number} | {error: string}> {
        const foundUser = await usersCollection.findOne({username})
        if (foundUser) {
            const validPassword = bcrypt.compareSync(password, foundUser.password)
            if (validPassword) {
                const token = generateAccessToken(foundUser._id)
                const userId = foundUser.id
                return {token, userId}
            }
        }
        return { error: 'Incorrect username or password' }
    },
    async getUsers(): Promise<UserType[]> {
        return usersCollection.find({}).toArray()
    },
}