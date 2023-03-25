import { Mapper } from "../helpers/mapper";
import { GameRoom } from "../models/gameRoom";
import { BaseService } from "./base.service";

export class GameRoomService extends BaseService<GameRoom> {

    constructor() {
        super('rooms')
    }

    /**
     * Test method for adding a user
     */
    async addUser(): Promise<void> {
        const usersCollection = await this.mongoDbConnector.getCollection('users')
        const userData = await usersCollection.findOne({ id: 1679586615381 })
        const user = Mapper.mapToUser(userData)
        const room = await this.findById(1679587198072)

        if (!room.users.find(x => x.id === user.id)) {
            room.users.push(user)
            await this.update(room.id, room)
        }
    }

    async attacked(id: number, damage: number): Promise<GameRoom> {
        const gameroom = await this.findById(id)
        gameroom.hitPoints -= damage
        await this.update(id, gameroom)

        return gameroom
    }

    async addIncome(id: number, income: number): Promise<GameRoom> {
        const gameRoom = await this.findById(id)
        gameRoom.gold += income
        await this.update(id, gameRoom)

        return gameRoom
    }

    async addIncomes(id: number, incomes: number[]): Promise<GameRoom> {
        const gameRoom = await this.findById(id)
        const total = incomes.reduce((sum, current) => sum + current)
        gameRoom.gold += total
        await this.update(id, gameRoom)

        return gameRoom
    }
}