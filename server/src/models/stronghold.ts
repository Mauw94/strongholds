import { User } from "./user"

export interface Stronghold {
    id: number
    name: string
    hitPoints: number
    gold: number
    users: User[]
}