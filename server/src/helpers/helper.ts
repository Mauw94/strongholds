import { Response } from "express";

export class Helper {

    static internalServerError(res: Response, error: any) {
        return res.status(500).send(error.message)
    }
}