import { Mapper } from "../helpers/mapper";
import { Stronghold } from "../models/stronghold";
import { BaseService } from "./base.service";

export class StrongholdService extends BaseService<Stronghold> {

    constructor() {
        super('strongholds')
    }

    /**
     * Test method for adding a user
     */
    async addUser(): Promise<void> {
        const usersCollection = await this.mongoDbConnector.getCollection('users')
        const userData = await usersCollection.findOne({ id: 1679586615381 })
        const user = Mapper.mapToUser(userData)
        const stronghold = await this.findByIdAsync(1679587198072)

        if (!stronghold.users.find(x => x.id === user.id)) {
            stronghold.users.push(user)
            await this.updateAsync(stronghold.id, stronghold)
        }
    }

    async attacked(id: number, damage: number): Promise<Stronghold> {
        const stronghold = await this.findByIdAsync(id)
        stronghold.hitPoints -= damage
        await this.updateAsync(id, stronghold)

        return stronghold
    }

    async addIncome(id: number, income: number): Promise<Stronghold> {
        const stronghold = await this.findByIdAsync(id)
        stronghold.gold += income
        await this.updateAsync(id, stronghold)

        return stronghold
    }

    async addIncomes(id: number, incomes: number[]): Promise<Stronghold> {
        const stronghold = await this.findByIdAsync(id)
        const total = incomes.reduce((sum, current) => sum + current)
        stronghold.gold += total
        await this.updateAsync(id, stronghold)

        return stronghold
    }
}