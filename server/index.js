import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const dataBaseUri = process.env.MONGO_URI

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

mongoose
    .connect(dataBaseUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err))