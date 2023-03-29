import { CacheableEntity } from "./cacheable-entity"
import { User } from "./user"

export interface Stronghold extends CacheableEntity {
    name: string
    hitPoints: number
    gold: number
    users: User[]
}