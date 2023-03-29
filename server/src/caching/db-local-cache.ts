import { CacheableEntity } from "../models/cacheable-entity"

export class DbLocalCache {

    private static instance: DbLocalCache
    private cache: CacheableEntity[] = []
    private cachedAt: number = Number.MIN_VALUE
    private expirationTime: number = Number.MIN_VALUE

    private constructor() { }

    static getInstance() {
        if (DbLocalCache.instance) return this.instance

        this.instance = new DbLocalCache()
        return this.instance
    }

    cacheItems(items: CacheableEntity[], expirationTime: number) {
        this.expirationTime = expirationTime
        this.cachedAt = Date.now()
        this.cache = items
    }

    getCache(): [CacheableEntity[], boolean] {
        const time = Date.now()
        let validCache: boolean = true

        if (time - this.cachedAt > this.expirationTime)
            validCache = false

        return [this.cache, validCache]
    }

    resetCache(): void {
        this.expirationTime = Number.MIN_VALUE
        this.cache = []
    }
}