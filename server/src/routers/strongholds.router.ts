import express, { Request, Response } from "express";
import { Stronghold } from "../models/stronghold";
import { StrongholdService } from "../services/strongholds.service";
import { Helper } from "../helpers/helper";

export const strongholdsRouter = express.Router()

strongholdsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const strongholdService = new StrongholdService()
        const strongholds: Stronghold[] = await strongholdService.findAllAsync()

        Helper.okJsonStatusCode(res, strongholds)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

strongholdsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const strongholdService = new StrongholdService()
        const id = parseInt(req.params.id, 10)
        const stronghold = await strongholdService.findByIdAsync(id)

        if (stronghold)
            return Helper.okJsonStatusCode(res, stronghold)

        Helper.notFoundStatusCode(res, "stronghold not found")
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

strongholdsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const stronghold: Stronghold = req.body
        stronghold.id = Date.now().valueOf()
        stronghold.hitPoints = 100
        stronghold.gold = 50
        const strongholdService = new StrongholdService()
        const newStronghold: Stronghold = await strongholdService.createAsync(stronghold)

        Helper.createdJsonStatusCode(res, newStronghold)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

strongholdsRouter.post('/attacked', async (req: Request, res: Response) => {
    try {
        // todo: update stronghold
        // update attack history

    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})

strongholdsRouter.post('/addUser', async (req: Request, res: Response) => {
    try {
        const strongholdService = new StrongholdService()
        await strongholdService.addUser()

        Helper.okStatusCode(res)
    } catch (e: any) {
        Helper.internalServerError(res, e)
    }
})
