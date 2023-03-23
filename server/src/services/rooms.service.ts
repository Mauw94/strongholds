
// import * as MongoDbConnector from "../db/mongoDbConnector"
// import { Room } from "../models/room"

// export const findAll = async (id: number): Promise<Room[]> => {
//     const roomsCol = await MongoDbConnector.getCollection('rooms')
//     const rooms = await roomsCol.find({}).toArray()

//     let roomsList: Room[] = []
//     rooms.forEach(r => {
//         roomsList.push(mapToRoom(r))
//     })

//     return roomsList
// }

// export const find = async (id: number): Promise<Room> => {
//     const roomsCol = await MongoDbConnector.getCollection('rooms')
//     const room = roomsCol.findOne({ id: id })

//     return mapToRoom(room)
// }

// export const create = async (newRoom: Room): Promise<Room> => {
//     const roomsCol = await MongoDbConnector.getCollection('rooms')

//     const id = Date.now().valueOf()
//     newRoom.id = id

//     await roomsCol.insertOne(newRoom)

//     return newRoom
// }

// export const update = async (id: number, roomUpdate: Room): Promise<Room | null> => {
//     const roomsCol = await MongoDbConnector.getCollection('rooms')
//     const room = await roomsCol.findOne({ id: id })

//     if (!room) return null

//     await roomsCol.updateOne({ id: id }, roomUpdate)

//     return mapToRoom(roomUpdate)
// }

// export const remove = async (id: number): Promise<null | void> => {
//     const roomsCol = await MongoDbConnector.getCollection('rooms')
//     const room = await roomsCol.findOne({ id: id })

//     if (!room) return null

//     await roomsCol.deleteOne({ id: id })
// }

// const mapToRoom = (data: any): Room => {
//     return {
//         id: data.id,
//         name: data.name,
//         users: data.users
//     }
// }