import { Response } from "express";

export class Helper {

    static NoContentStatusCode(res: Response): Response<string, Record<string, any>> {
        return res.status(204)
    }

    static okStatusCode(res: Response): Response<string, Record<string, any>> {
        return res.status(200).sendStatus(200)
    }

    static okJsonStatusCode(res: Response, data: any): Response<string, Record<string, any>> {
        return res.status(200).json(data)
    }

    static createdJsonStatusCode(res: Response, data: any): Response<string, Record<string, any>> {
        return res.status(201).json(data)
    }

    static internalServerError(res: Response, error: any): Response<string, Record<string, any>> {
        return res.status(500).send(error.message)
    }

    static notFoundStatusCode(res: Response, errMsg: string): Response<string, Record<string, any>> {
        return res.status(500).send(errMsg)
    }
}