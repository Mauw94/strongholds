import { CacheableEntity } from "./cacheable-entity";
import { EventType } from "./enums/event-type.enum";

export interface Event extends CacheableEntity {
    event: EventType
    playerId: number
    strongholdId: number
    description: string
}