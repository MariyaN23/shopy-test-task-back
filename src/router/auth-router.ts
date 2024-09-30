import {Request, Response, Router} from "express";
import {authService} from "../service/auth-service";
import {body} from "express-validator";
import {validationMiddleware} from "../middleware/validation";
import {UserType} from "../repository/db";
import {authMiddleware} from "../middleware/auth-middleware";

export const authRouter = Router({})

const usernameValidation = body('username').trim().isLength({
    min: 3,
    max: 30
}).withMessage("Username should be from 3 to 30 symbols")

const passwordValidation = body('password').trim().isLength({
    min: 8,
    max: 30
}).withMessage("Password should be from 8 to 30 symbols")

authRouter.post('/registration',
    passwordValidation,
    usernameValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const newUser = await authService.registration(req.body.username, req.body.password)
            res.status(200).send(`New user ${newUser.username} registered`)
        } catch (error) {
            res.status(400).send({message: `Registration error ${error}`})
        }
    })

authRouter.post('/login',
    passwordValidation,
    usernameValidation,
    validationMiddleware,
    async (req: Request, res: Response) => {
        try {
            const result = await authService.login(req.body.username, req.body.password);
            if (typeof result === 'object' && 'userId' in result) {
                res.cookie("token", result.token, { httpOnly: true, secure: true })
                res.status(200).json({userId: result.userId, token: result.token})
            } else {
                res.status(400).send({ message: `Login error ${result}` });
            }
        }  catch (error) {
            res.status(400).send({message: `Login error ${error}`})
        }
    })

authRouter.get('/me',
    authMiddleware,
    async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        res.status(200).json({isAuthorized: true, userId: req.user.id})
    } catch (error) {
        res.status(400).send({message: `Login error ${error}`})
    }
})

authRouter.delete('/logout', async (req: Request, res: Response) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true })
        res.status(200).send({ message: 'Logout successfully' })
    } catch (error) {
        res.status(400).send({ message: `Error: ${error}` })
    }
});

authRouter.get('/users',
    authMiddleware,
    async (req: Request, res: Response) => {
        try {
            const foundUsers: UserType[] = await authService.getUsers()
            res.send(foundUsers.map((u: UserType) => {
                return {id: u.id, username: u.username}
            }))
        } catch (error) {
            res.status(500).send("An error occurred while fetching users")
        }
    })