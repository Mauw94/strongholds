import express, { Request, Response } from "express";
import { GameRoom } from "../models/gameRoom";
import { GameRoomService } from "../services/gameRooms.service";
import { Helper } from "../helpers/helper";

export const roomsRouter = express.Router()

roomsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        const rooms: GameRoom[] = await gameroomService.findAll()

        res.status(200).send(rooms)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

roomsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        const id = parseInt(req.params.id, 10)
        const gameroom = await gameroomService.findById(id)

        res.status(200).json(gameroom)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

roomsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const room: GameRoom = req.body
        room.id = Date.now().valueOf()
        room.hitPoints = 100
        room.gold = 50
        const gameroomService = new GameRoomService()
        const newRoom: GameRoom = await gameroomService.create(room)

        res.status(201).json(newRoom)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

roomsRouter.post('/attacked', async (req: Request, res: Response) => {
    try {

    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})

roomsRouter.post('/addUser', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        await gameroomService.addUser()
        res.status(200).sendStatus(200)
    } catch (e: any) {
        return Helper.internalServerError(res, e)
    }
})
