import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import { usersRouter } from './routers/users.router'
import { ErrorHandler } from "./middleware/error.middleware"
import { NotFoundHandler } from "./middleware/not-found.middleware"
import mongoose from 'mongoose'

let port: number = 0
const app = express()

dotenv.config();

if (!process.env.PORT) {
    port = 7000
} else {
    port = parseInt(process.env.PORT as string, 10)
}

// TODO: not local mongodb setup yet
mongoose.connect('mongodb://localhost/strongholds')
    .then(() => {
        console.log('mongodb connected')
    }).catch((err) => console.error(err))

app.use(helmet())
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)

app.use(ErrorHandler)
app.use(NotFoundHandler)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
