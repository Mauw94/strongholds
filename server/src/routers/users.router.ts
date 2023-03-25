import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { UserService } from '../services/users.service'
import { Helper } from '../helpers/helper'

export const usersRouter = express.Router()

usersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const userService = new UserService()
        const users: User[] = await userService.findAll()

        res.status(200).send(users)
    }
    catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const userService = new UserService()
        const user: User = await userService.findById(id)

        if (user)
            return res.status(200).send(user)

        res.status(400).send('user not found')
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user: User = req.body
        user.id = Date.now().valueOf()
        const userService = new UserService()
        const newUser: User = await userService.create(user)

        res.status(201).json(newUser)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

usersRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const userUpdate: User = req.body
        const userService = new UserService()
        const existingUser: User = await userService.findById(id)

        if (existingUser) {
            const updatedUser = await userService.update(id, userUpdate)
            return res.status(200).json(updatedUser)
        }

        const newUser: User = await userService.create(userUpdate)

        res.status(201).json(newUser)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userService = new UserService()
        const id: number = parseInt(req.params.id, 10)
        await userService.remove(id)

        res.sendStatus(204)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})