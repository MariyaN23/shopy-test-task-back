import {historyRepository} from "../repository/history-repository";
import {HistoryType} from "../repository/db";

export const historyService = {
    async findHistoryByUserId(userId: number): Promise<HistoryType | null> {
        return historyRepository.findHistoryByUserId(userId)
    },
    async addToHistory(userId: number): Promise<string> {
        const result = await historyRepository.addToHistory(userId)
        return result
    },
}