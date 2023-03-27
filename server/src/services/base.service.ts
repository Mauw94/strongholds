import { MongoDbConnector } from "../db/mongoDbConnector"
import { Mapper } from "../helpers/mapper"

export class BaseService<T> {

    public mongoDbConnector: MongoDbConnector
    private collection: string

    constructor(collection: string) {
        this.collection = collection
        this.mongoDbConnector = new MongoDbConnector()
    }

    async findAllAsync(): Promise<T[]> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const collectionResult = await collection.find({}).toArray()

        const returnList: T[] = []
        collectionResult.forEach(c => {
            returnList.push(Mapper.mapToObject(c))
        })

        return returnList
    }

    async findByIdAsync(id: number): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        return Mapper.mapToObject(item)
    }

    async findWithFilterAsync(filter: any): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne(filter)

        return Mapper.mapToObject(item)
    }

    async createAsync(newItem: T): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)

        const item = Object.assign({}, newItem)
        await collection.insertOne(item)

        return item
    }

    async updateAsync(id: number, itemUpdate: T): Promise<T | null> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        if (!item) return null

        const updatedItem = Object.assign({}, itemUpdate)
        await collection.updateOne({ id: id }, { $set: updatedItem })

        return Mapper.mapToObject(updatedItem)
    }

    async removeAsync(id: number): Promise<null | void> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        if (!item) return null

        await collection.deleteOne({ id: id })
    }
}