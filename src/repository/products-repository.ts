import {productsCollection, ProductType} from "./db";

export const productsRepository = {
    async findProduct(name: string | null | undefined,
                      min: string | null | undefined,
                      max: string | null | undefined,
                      order: string | null | undefined,
                      page: string = '1',
                      pageSize: string = '6'): Promise<{products: ProductType[], total: number}> {
        const filter: any = {}
        if (name) {
            filter.name = { $regex: name, $options: 'i'}
        }
        if (min && max) {
            filter.price = { $gte: parseFloat(min), $lte: parseFloat(max) }
        } else if (min) {
            filter.price = { $gte: parseFloat(min) }
        } else if (max) {
            filter.price = { $lte: parseFloat(max) }
        }
        const sort: any = {}
        if (order) {
            sort.date = order === 'desc' ? -1 : 1
        }
        const skip = (Number(page) - 1) * Number(pageSize)
        const total = await productsCollection.countDocuments(filter)
        const products = await productsCollection.find(filter).sort(sort).skip(skip).limit(Number(pageSize)).toArray()
        return { products, total }
    },
    async findProductsByUserId(userId: number): Promise<ProductType[]> {
        const products: ProductType[] | null | undefined = await productsCollection.find({userId}).toArray()
        return products
    },
    async createProduct(newProduct: ProductType): Promise<ProductType> {
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({productId: id})
        return result.deletedCount === 1
    },
    async findProductById(productId: number): Promise<ProductType | null> {
        const product: ProductType | null = await productsCollection.findOne({productId})
        return product
    },
}