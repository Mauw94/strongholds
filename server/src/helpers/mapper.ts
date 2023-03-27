import { Stronghold } from "../models/stronghold";
import { User } from "../models/user";

export class Mapper {

    static mapToUser(data: any): User {
        return { name: data.name, password: data.password, id: data.id, email: data.email, token: data.token, salt: data.salt }
    }

    static mapToGameroom(data: any): Stronghold {
        return { id: data.id, name: data.name, users: data.users, hitPoints: data.hitPoints, gold: data.gold }
    }

    static mapToObject(data: any) {
        const obj = Object.assign({}, data)
        return obj // returns object and will auto parse to correct T object
    }
}