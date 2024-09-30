import {cartsCollection, CartType, historyCollection, HistoryType, ProductWithCount} from "./db";

export const historyRepository = {
    async findHistoryByUserId(userId: number): Promise<HistoryType | null> {
        const history: HistoryType | null = await historyCollection.findOne({userId})
        if (history) {
            return history
        } else {
            const addHistory: HistoryType = {
                userId,
                itemsInHistory: []
            }
            await historyCollection.insertOne(addHistory)
            return addHistory
        }
    },
    async addToHistory(userId: number): Promise<string> {
        const cart: CartType | null = await cartsCollection.findOne({userId})
        let newHistory
        let newHistoryAll
        if (cart) {
            const date = new Date()
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            const addedDate = `${day}.${month}.${year}`

            newHistory = cart.itemsInCart.map(el => ({
                productId: el.productId,
                name: el.name,
                price: el.price,
                dateOfBuy: addedDate,
                image: el.image
            }))
            const itemsWhoWasInHistory = await historyCollection.findOne({userId})
            if (itemsWhoWasInHistory) {
                newHistoryAll = newHistory.concat(itemsWhoWasInHistory.itemsInHistory)
            }
        }
        if (newHistoryAll) {
            const addToUsersHistory = await historyCollection.updateOne(
                { userId },
                { $set: { itemsInHistory: newHistoryAll } })
            if (addToUsersHistory) {
                return `History updated successfully!`
            } else {
                return `Failed to update`
            }
        }
        return `Failed to add in history`
    },
}