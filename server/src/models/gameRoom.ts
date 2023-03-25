import { User } from "./user"

export interface GameRoom {
    id: number
    name: string
    hitPoints: number
    gold: number
    users: User[]
}