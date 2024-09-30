import {productsRepository} from "../repository/products-repository";
import {ProductType} from "../repository/db";

export const productsService = {
    async findProduct(name: string | null | undefined,
                      min: string | null | undefined,
                      max: string | null | undefined,
                      order: string | null | undefined,
                      page: string = '1',
                      pageSize: string = '6'): Promise<{ products: ProductType[],  total: number}> {
        const search = await productsRepository.findProduct(name, min, max, order, page, pageSize)
        return search
    },
    async findProductsByUserId(userId: number): Promise<ProductType[] | null> {
        return productsRepository.findProductsByUserId(userId)
    },
    async createProduct(name: string, price: number, image: string, userId: number): Promise<ProductType> {
        const date = new Date()
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        const addedDate = `${day}.${month}.${year}`

        const newProduct: ProductType = {
            productId: +date,
            name,
            price: Number(price),
            date: addedDate,
            status: 'On sale',
            userId: Number(userId),
            image
        }
        const createdProduct: ProductType = await productsRepository.createProduct(newProduct)
        return createdProduct
    },
    async deleteProduct(id: number): Promise<boolean> {
        return await productsRepository.deleteProduct(id)
    },
    async findProductById(id: number): Promise<ProductType | null> {
        return productsRepository.findProductById(id)
    },
}