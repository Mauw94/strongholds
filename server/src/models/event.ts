import { EventType } from "./enums/event-type.enum";

export interface Event {
    id: number
    event: EventType
    playerId: number
    strongholdId: number
    description: string
}