import express, { Request, Response } from "express";
import { Room } from "../models/room";
import { RoomService } from "../services/rooms.service";

export const roomsRouter = express.Router()

roomsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const roomService = new RoomService()
        const rooms: Room[] = await roomService.findAll()

        res.status(200).send(rooms)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

roomsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const room: Room = req.body
        room.id = Date.now().valueOf()
        const roomService = new RoomService()
        const newRoom: Room = await roomService.create(room)

        res.status(201).json(newRoom)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})

roomsRouter.post('/addUser', async (req: Request, res: Response) => {
    try {
        const roomService = new RoomService()
        await roomService.addUser()
        res.status(200)
    } catch (e: any) {
        res.status(500).send(e.message)
    }
})