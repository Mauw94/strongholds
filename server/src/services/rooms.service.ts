import { Room } from "../models/room";
import { User } from "../models/user";
import { BaseService } from "./base.service";

export class RoomService extends BaseService<Room> {

    constructor() {
        super('rooms')
    }

    async addUser() {
        const usersCollection = await this.mongoDbConnector.getCollection('users')
        const user = await usersCollection.findOne({ id: 1679586615381 })
        console.log('user')
        console.log(user)
        const room = await this.find(1679587198072)
        console.log('room')
        console.log(room)
        room.users.push(this.userObj(user))
        console.log('updating')
        await this.update(room.id, room)
    }

    userObj(user: any): User {
        return { name: user.name, password: user.password, id: user.id, email: user.email, token: user.token }
    }
}