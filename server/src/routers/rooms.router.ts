import express, { Request, Response } from "express";
import { GameRoom } from "../models/gameRoom";
import { GameRoomService } from "../services/gameRooms.service";

export const roomsRouter = express.Router()

roomsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        const rooms: GameRoom[] = await gameroomService.findAll()

        res.status(200).send(rooms)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

roomsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        const id = parseInt(req.params.id, 10)
        const gameroom = await gameroomService.findById(id)

        res.status(200).json(gameroom)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

roomsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const room: GameRoom = req.body
        room.id = Date.now().valueOf()
        const gameroomService = new GameRoomService()
        const newRoom: GameRoom = await gameroomService.create(room)

        res.status(201).json(newRoom)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

roomsRouter.post('/addUser', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        await gameroomService.addUser()
        res.status(200).sendStatus(200)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})