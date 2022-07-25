import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileupload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postsRoute from './routes/posts.js'


const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware

// cors чтобы запускать приложение с разных ip адресов
app.use(cors())
// чтобы работать с картинками
app.use(fileupload())
// чтобы приложение понимало json
app.use(express.json())
// папка с картинками
app.use(express.static('uploads'))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)


async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.g6hue.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

        app.listen(PORT, () => {
            console.log(`server started on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()

