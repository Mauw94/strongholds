import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import { usersRouter } from './routers/users.router'
import { ErrorHandler } from "./middleware/error.middleware"
import { NotFoundHandler } from "./middleware/not-found.middleware"
import { roomsRouter } from "./routers/rooms.router"

let port: number = 0
const app = express()

dotenv.config();

if (!process.env.PORT) {
    port = 7000
} else {
    port = parseInt(process.env.PORT as string, 10)
}

app.use(helmet())
app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/rooms', roomsRouter)

app.use(ErrorHandler)
app.use(NotFoundHandler)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
