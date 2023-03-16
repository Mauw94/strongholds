import express, { Request, Response } from 'express'
import * as UserService from '../services/users.service'
import { User } from '../models/user'

export const usersRouter = express.Router()

usersRouter.get('/', async (req: Request, res: Response) => {
    console.log('getting users')
    try {
        const users: User[] = await UserService.findAll()

        res.status(200).send(users)
    }
    catch (e: any) {
        res.status(500).send(e.message)
    }
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const user: User = await UserService.find(id)

        if (user)
            return res.status(200).send(user)

        res.status(400).send('user not found')
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

usersRouter.post('/', async (req: Request, res: Response) => {
    console.log(req)
    
    try {
        const user: User = req.body
        console.log(user)
        const newUser: User = await UserService.create(user)

        res.status(201).json(newUser)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

usersRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)

    try {
        const userUpdate: User = req.body
        const existingUser: User = await UserService.find(id)

        if (existingUser) {
            const updatedUser = await UserService.update(id, userUpdate)
            return res.status(200).json(updatedUser)
        }

        const newUser: User = await UserService.create(userUpdate)

        res.status(201).json(newUser)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

usersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)
        await UserService.remove(id)

        res.sendStatus(204)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})