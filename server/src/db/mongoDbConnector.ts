import { Collection, Document, MongoClient } from "mongodb"

export class MongoDbConnector {

    async getCollection(collection: string): Promise<Collection<Document>> {
        const client = this.connect()
        const db = client.db('strongholds')
        return db.collection(collection)
    }

    private connect(): MongoClient {
        const uri = process.env.CONN_STRING as string
        const client = new MongoClient(uri)

        return client
    }
}

