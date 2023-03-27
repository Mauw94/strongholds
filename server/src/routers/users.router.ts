import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserService } from '../services/users.service'
import { Helper } from '../helpers/helper'

export const usersRouter = express.Router()

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userService = new UserService()
        const users: User[] = await userService.findAllAsync()

        Helper.okJsonStatusCode(res, users)
    }
    catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const userService = new UserService()
        const user: User = await userService.findByIdAsync(id)

        if (user)
            return Helper.okJsonStatusCode(res, user)

        Helper.notFoundStatusCode(res, 'user not found')
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user: User = req.body
        user.id = Date.now().valueOf()
        const userService = new UserService()
        const newUser: User = await userService.createAsync(user)

        Helper.createdJsonStatusCode(res, newUser)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

usersRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const userUpdate: User = req.body
        const userService = new UserService()
        const existingUser: User = await userService.findByIdAsync(id)

        if (existingUser) {
            const updatedUser = await userService.updateAsync(id, userUpdate)
            return res.status(200).json(updatedUser)
        }

        const newUser: User = await userService.createAsync(userUpdate)
        
        Helper.createdJsonStatusCode(res, newUser)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userService = new UserService()
        const id: number = parseInt(req.params.id, 10)
        await userService.removeAsync(id)

        Helper.noContentStatusCode(res)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})