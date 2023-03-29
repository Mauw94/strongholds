export class DbLocalCache<T> {

    private static instance: DbLocalCache<any>
    private cache: T[] = []
    private cachedAt: number = Number.MIN_VALUE
    private expirationTime: number = Number.MIN_VALUE

    private constructor() { }

    static getInstance() {
        if (DbLocalCache.instance) return this.instance

        this.instance = new DbLocalCache<any>()
        return this.instance
    }

    cacheItems(items: T[], expirationTime: number) {
        this.expirationTime = expirationTime
        this.cachedAt = Date.now()
        this.cache = items
    }

    getCachedItems(): [T[], boolean] {
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