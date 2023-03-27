import express, { Request, Response } from "express";
import { Helper } from "../helpers/helper";
import { EventTrackingService } from "../services/event-tracking.service";
import { Event } from "../models/event";

export const eventTrackingRouter = express.Router()

eventTrackingRouter.get('/', async (req: Request, res: Response) => {

})

eventTrackingRouter.post('/', async (req: Request, res: Response) => {
    try {
        const eventTrackingService = new EventTrackingService()
        const event: Event = req.body
        event.id = Date.now().valueOf()
        const createdEvent = await eventTrackingService.createAsync(event)

        Helper.createdJsonStatusCode(res, createdEvent)
    } catch (e: any) {
        Helper.internalServerError(res, e.message)
    }
})