import express, { Request, Response } from "express";
import { GameRoom } from "../models/gameRoom";
import { GameRoomService } from "../services/gameRooms.service";
import { Helper } from "../helpers/helper";

export const roomsRouter = express.Router()

roomsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        const rooms: GameRoom[] = await gameroomService.findAll()

        Helper.okJsonStatusCode(res, rooms)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

roomsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        const id = parseInt(req.params.id, 10)
        const gameroom = await gameroomService.findById(id)

        if (gameroom)
            return Helper.okJsonStatusCode(res, gameroom)

        Helper.notFoundStatusCode(res, "gameroom not found")
    } catch (e: any) {
        Helper.internalServerError(res, e)
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

        Helper.createdJsonStatusCode(res, newRoom)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

roomsRouter.post('/attacked', async (req: Request, res: Response) => {
    try {

    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

roomsRouter.post('/addUser', async (req: Request, res: Response) => {
    try {
        const gameroomService = new GameRoomService()
        await gameroomService.addUser()

        Helper.okStatusCode(res)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})
