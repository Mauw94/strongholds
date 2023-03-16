import { User, Users } from "../models/user";
import Bcrypt from 'bcrypt'

let users: Users = {
    1: {
        id: 1,
        name: "test",
        email: "abc@mail.com",
        password: "test123",
        token: ""
    },
    2: {
        id: 2,
        name: "test2",
        email: "abc2@mail.com",
        password: "test123",
        token: ""
    },
    3: {
        id: 3,
        name: "test3",
        email: "abc3@mail.com",
        password: "test123",
        token: ""
    },
}

export const findAll = async (): Promise<User[]> => Object.values(users)

export const find = async (id: number): Promise<User> => users[id]

export const create = async (newUser: User): Promise<User> => {
    const id = Date.now().valueOf()
    const salt = Bcrypt.genSaltSync(10)
    const hash = await Bcrypt.hash(newUser.password, salt)

    newUser.password = hash
    newUser.id = id

    users[id] = {
        ...newUser,
    };

    return users[id]
}

export const update = async (id: number, userUpdate: User): Promise<User | null> => {
    const user = await find(id)

    if (!user) return null

    users[id] = { ...userUpdate }

    return users[id]
}

export const remove = async (id: number): Promise<null | void> => {
    const user = await find(id)

    if (!user) return null

    delete users[id]
}