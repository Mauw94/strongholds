import { CacheableEntity } from "./cacheable-entity"

export interface User extends CacheableEntity {
    password: string
    email: string
    name: string
    token: string
    salt: string
}

export interface Users {
    [key: number]: User
}