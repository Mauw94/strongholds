import { Collection, Document, MongoClient } from "mongodb"

export const getCollection = async (collection: string): Promise<Collection<Document>> => {
    const client = await connect()
    const db = client.db('strongholds')
    const col = db.collection(collection)

    return col
}

const connect = async (): Promise<MongoClient> => {
    const uri = process.env.CONN_STRING as string
    const client = new MongoClient(uri)

    return client
}
