import { Event } from "../models/event";
import { BaseService } from "./base.service";

export class EventTrackingService extends BaseService<Event> {

    constructor() {
        super('events')
    }
}