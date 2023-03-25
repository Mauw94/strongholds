import { User } from "../models/user";
import { BaseService } from "./base.service";
import * as Bcrypt from "bcrypt"

export class UserService extends BaseService<User> {

    constructor() {
        super('users')
    }

    override async create(newUser: User): Promise<User> {
        const collection = await this.mongoDbConnector.getCollection('users')
        const salt = Bcrypt.genSaltSync(10)
        const hash = await Bcrypt.hash(newUser.password, salt)

        newUser.password = hash
        newUser.salt = salt

        await collection.insertOne(newUser)

        return newUser
    }
}