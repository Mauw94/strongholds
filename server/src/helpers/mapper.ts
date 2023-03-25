import { GameRoom } from "../models/gameRoom";
import { User } from "../models/user";

export class Mapper {

    static mapToUser(data: any): User {
        return { name: data.name, password: data.password, id: data.id, email: data.email, token: data.token }
    }

    static mapToGameroom(data: any): GameRoom {
        return { id: data.id, name: data.name, users: data.users, hitPoints: data.hitPoints, gold: data.gold }
    }
}