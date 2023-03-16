import { User } from '../models/user'
import * as UserService from '../services/users.service'

describe('UserService', () => {

    test('Should get all users', async () => {
        const users = await UserService.findAll()
        expect(users.length).toBe(3)
    })

    test('Should get user by id', async () => {
        const user = await UserService.find(1)
        expect(user).toBeDefined()
    })

    test('Should create user', async () => {
        const newUser: User = {
            email: "test@test.com",
            id: 0,
            name: "test",
            password: "123",
            token: ""
        }
        const addedUser = await UserService.create(newUser)

        expect(addedUser).toBeDefined()
        expect(addedUser.name).toBe(newUser.name)
        expect(addedUser.email).toBe(newUser.email)
    })

    test('Should update user', async () => {
        const userUpdate = await UserService.find(1)
        const newName = "updated_name"
        userUpdate.name = newName

        const updatedUser = await UserService.update(userUpdate.id, userUpdate) as User

        expect(updatedUser).toBeDefined()
        expect(updatedUser.name).toBe(newName)
        expect(updatedUser.id).toBe(userUpdate.id)
    })

    test('Should remove user', async () => {
        const usersBeforeRemove = await UserService.findAll()
        await UserService.remove(1)
        const usersAfterRemove = await UserService.findAll()

        expect(usersAfterRemove.length).toBe(usersBeforeRemove.length - 1)
    })
})