import { Collection, Document, MongoClient } from "mongodb"

export class MongoDbConnector {

    private database?: string

    constructor(database?: string) {
        this.database = database
    }

    async getCollection(collection: string): Promise<Collection<Document>> {
        const client = this.connect()
        const db =
            this.database === undefined
                ? client.db(process.env.DBNAME)
                : client.db(this.database)

        return db.collection(collection)
    }

    private connect(): MongoClient {
        const uri = process.env.CONN_STRING as string
        const client = new MongoClient(uri)

        return client
    }
}

