import { Mapper } from "../helpers/mapper";
import { GameRoom } from "../models/gameRoom";
import { BaseService } from "./base.service";

export class GameRoomService extends BaseService<GameRoom> {

    constructor() {
        super('rooms')
    }

    async addUser() {
        const usersCollection = await this.mongoDbConnector.getCollection('users')
        const userData = await usersCollection.findOne({ id: 1679586615381 })
        const user = Mapper.mapToUser(userData)
        const room = await this.findById(1679587198072)

        if (!room.users.find(x => x.id === user.id)) {
            room.users.push(user)
            await this.update(room.id, room)
        }
        return
    }
}