import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import router from './routes'
import { initiateDatabase } from './config/db'
const app = express()


initiateDatabase()
    .then(() => console.log('Database connected'))
    .then(() => {
        app.use(cors())
        app.use(json())
        app.use("/api", router);
        app.listen(3000)
    })