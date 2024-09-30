import {authRepository} from "../repository/auth-repository";
import {UserType} from "../repository/db";
import bcrypt from "bcrypt"

export const authService = {
    async registration(username: string, password: string): Promise<UserType> {
        const hashedPassword = bcrypt.hashSync(password, 7)
        const userId = +new Date()
        const createdUser: UserType = await authRepository.registerUser(userId, username, hashedPassword)
        return createdUser
    },
    async login(username: string, password: string): Promise<{ token: string, userId: number } | {error: string}>  {
        const res = await authRepository.loginUser(username, password)
        return res
    },
    async getUsers(): Promise<UserType[]> {
        return authRepository.getUsers()
    },
}