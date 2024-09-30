import {Request, Response, Router} from "express";
import {historyService} from "../service/history-service";
import cors from "cors";
import {corsOptions} from "../index";
import {HistoryType} from "../repository/db";

export const historyRouter = Router({})

historyRouter.get('/:userId', cors(corsOptions), async (req: Request, res: Response) => {
    try {
        const usersHistory: HistoryType | null = await historyService.findHistoryByUserId(+req.params.userId)
        usersHistory ? res.status(200).send(usersHistory) : res.status(404).send(`History not found`)
    } catch (error) {
        res.status(500).send("An error occurred while fetching history")
    }
})

historyRouter.post('/:id', async (req: Request, res: Response) => {
        const result = await historyService.addToHistory(+req.params.id)
        res.status(200).send(result)
    })