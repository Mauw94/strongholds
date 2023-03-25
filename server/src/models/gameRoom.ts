import { User } from "./user"

export interface GameRoom {
    id: number
    name: string
    users: User[]
}