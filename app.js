import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import subscriptionRouter from './routes/subscriptionRoute.js'
import connectDB from './database/mongoDB.js'
import erorrMiddleware from './middlewares/errorMiddlewares.js'
import cookieParser from 'cookie-parser'
import { limiter, PORT } from './config/config.js'

const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(erorrMiddleware)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', limiter, userRouter)
app.use('/api/v1/subscriptions', limiter, subscriptionRouter)

app.listen(PORT, async () => {
    await connectDB()
    console.log('serveris Live ' + PORT);
})