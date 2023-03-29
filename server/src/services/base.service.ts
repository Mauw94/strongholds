import { DbLocalCache } from "../caching/db-local-cache"
import { MongoDbConnector } from "../db/mongoDbConnector"
import { Mapper } from "../helpers/mapper"
import { CacheableEntity } from "../models/cacheable-entity"

export class BaseService<T extends CacheableEntity> {

    public mongoDbConnector: MongoDbConnector
    private collection: string
    private caching: DbLocalCache
    private cacheTTL: number

    constructor(collection: string) {
        this.collection = collection
        this.mongoDbConnector = new MongoDbConnector()
        this.caching = DbLocalCache.getInstance()

        const cacheTTL = parseInt(process.env.CACHETTL_IN_MIN as string, 10)
        this.cacheTTL = (cacheTTL * 60 * 1000)
    }

    async findAllAsync(): Promise<T[]> {
        const [items, validCache] = this.caching.getCache()
        if (validCache) return items as T[]

        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const collectionResult = await collection.find({}).toArray()

        const returnList: T[] = []
        collectionResult.forEach(c => {
            returnList.push(Mapper.mapToObject(c))
        })

        this.caching.cacheItems(returnList, this.cacheTTL)

        return returnList
    }

    async findByIdAsync(id: number): Promise<T> {
        const [items, validCache] = this.caching.getCache()
        if (validCache) return items.find(i => i.id === id) as T

        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        return Mapper.mapToObject(item)
    }

    async findOneWithFilterAsync(filter: any): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne(filter)

        return Mapper.mapToObject(item)
    }

    async findAllWithFilterAsync(filter: any): Promise<T[]> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const items = await collection.find(filter).toArray()

        const returnList: T[] = []
        items.forEach(i => {
            returnList.push(Mapper.mapToObject(i))
        })

        return returnList
    }

    async createAsync(newItem: T): Promise<T> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)

        const item = Object.assign({}, newItem)
        await collection.insertOne(item)

        this.caching.resetCache()

        return item
    }

    async updateAsync(id: number, itemUpdate: T): Promise<T | null> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        if (!item) return null

        const updatedItem = Object.assign({}, itemUpdate)
        await collection.updateOne({ id: id }, { $set: updatedItem })

        this.caching.resetCache()

        return Mapper.mapToObject(updatedItem)
    }

    async removeAsync(id: number): Promise<null | void> {
        const collection = await this.mongoDbConnector.getCollection(this.collection)
        const item = await collection.findOne({ id: id })

        if (!item) return null

        await collection.deleteOne({ id: id })
    }
}