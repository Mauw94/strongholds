import { CacheableEntity } from "../models/cacheable-entity"

export class DbLocalCache {

    private static instance: DbLocalCache
    private cache: CacheableEntity[] = []
    private cachedAt: number = Number.MIN_VALUE
    private expirationTime: number = Number.MIN_VALUE

    private constructor() { }

    // DbLocalCache is a singleton
    static getInstance() {
        if (DbLocalCache.instance) return this.instance

        this.instance = new DbLocalCache()
        return this.instance
    }

    // cache a new set of items with an expiration time
    cacheItems(items: CacheableEntity[], expirationTime: number) {
        this.expirationTime = expirationTime
        this.cachedAt = Date.now()
        this.cache = items
    }

    // get the items and check wether they're expired or not
    getCache(): [CacheableEntity[], boolean] {
        const time = Date.now()
        let validCache: boolean = true

        if (time - this.cachedAt > this.expirationTime)
            validCache = false

        return [this.cache, validCache]
    }

    // "expire" the cached items
    resetCache(): void {
        this.expirationTime = Number.MIN_VALUE
        this.cache = []
    }
}