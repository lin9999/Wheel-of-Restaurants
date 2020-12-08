import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes/index.js'

// To make sure require() can work
import { createRequire } from 'module'
const require = createRequire(import.meta.url);
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 4000
const dboptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
    useUnifiedTopology: true,
    poolSize: 10
}

// connect mongodb
mongoose.connect(process.env.MONGO_URL, dboptions)

const db = mongoose.connection

db.on('error', (error) => {
    console.error(error)
})

db.once('open', () => {
    console.log('MongoDB connected!')
    routes(app)
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})