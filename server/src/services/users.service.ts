import { User } from "../models/user";
import Bcrypt from 'bcrypt'
import * as MongoDbConnector from "../db/mongoDbConnector";

export const findAll = async (): Promise<User[]> => {
    const usersCol = await MongoDbConnector.getCollection('users')
    const users = await usersCol.find({}).toArray()

    let userList: User[] = []
    users.forEach(u => {
        userList.push(mapToUser(u))
    })

    return userList
}

export const find = async (id: number): Promise<any> => {
    const usersCol = await MongoDbConnector.getCollection('users')
    const user = await usersCol.findOne({ id: id })

    return mapToUser(user)
}

export const create = async (newUser: User): Promise<User> => {
    const usersCol = await MongoDbConnector.getCollection('users')

    const id = Date.now().valueOf()
    const salt = Bcrypt.genSaltSync(10)
    const hash = await Bcrypt.hash(newUser.password, salt)

    newUser.password = hash
    newUser.id = id

    await usersCol.insertOne(newUser)

    return newUser
}

export const update = async (id: number, userUpdate: User): Promise<User | null> => {
    const usersCol = await MongoDbConnector.getCollection('users')
    const user = await usersCol.findOne({ id: id })

    if (!user) return null

    await usersCol.updateOne({ id: id }, userUpdate)

    return mapToUser(user)
}

export const remove = async (id: number): Promise<null | void> => {
    const usersCol = await MongoDbConnector.getCollection('users')
    const user = await usersCol.findOne({ id: id })

    if (!user) return null

    await usersCol.deleteOne({ id: id })
}

const mapToUser = (data: any): User => {
    return {
        id: data.id,
        email: data.email,
        password: data.password,
        name: data.name,
        token: data.token
    }
}