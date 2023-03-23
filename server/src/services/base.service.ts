import { MongoDbConnector } from "../db/mongoDbConnector"

export class BaseService<T> {

    public mongoDbConnector: MongoDbConnector
    private collection: string

    constructor(collection: string) {
        this.collection = collection
        this.mongoDbConnector = new MongoDbConnector()
    }

    async findAll(): Promise<T[]> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const collectionResult = await collection.find({}).toArray()

        const returnList: T[] = []
        collectionResult.forEach(c => {
            returnList.push(this.mapToObject(c))
        })

        return returnList
    }

    async find(id: number): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        return this.mapToObject(item)
    }

    async create(newItem: T): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)

        const item = Object.assign({}, newItem)
        await collection.insertOne(item)

        return item
    }

    async update(id: number, itemUpdate: T): Promise<T | null> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        if (!item) return null

        const updatedItem = Object.assign({}, itemUpdate)
        await collection.updateOne({ id: id }, { $set: updatedItem })

        return this.mapToObject(updatedItem)
    }

    async remove(id: number): Promise<null | void> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        console.log(item)

        if (!item) return null

        await collection.deleteOne({ id: id })
    }

    private mapToObject(data: any) {
        const n = {}
        const t = Object.assign(n, data)
        return t
    }
}