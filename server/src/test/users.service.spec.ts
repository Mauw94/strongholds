import * as UserService from '../services/users.service'

describe('UserService', () => {

    test('Should get all users', async () => {
        const users = await UserService.findAll()
        expect(users.length).toBe(3)
    })

})