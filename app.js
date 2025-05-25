import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import subscriptionRouter from './routes/subscriptionRoute.js'
import connectDB from './database/mongoDB.js'
import erorrMiddleware from './middlewares/errorMiddlewares.js'
import cookieParser from 'cookie-parser'
import { limiter, PORT } from './config/config.js'
import cors from 'cors'

const app = express()// Create an Express application
dotenv.config()// Load environment variables from .env file
app.use(cors())// Allow CORS for all origins 
app.use(express.json())// Parse JSON bodies
app.use(express.urlencoded({ extended: false }))// Parse URL-encoded bodies
app.use(cookieParser())// Parse cookies

app.use(erorrMiddleware)// Use error handling middleware
app.use('/api/v1/auth', authRouter)// Define routes for authentication
app.use('/api/v1/users', limiter, userRouter)// Define routes for user management
app.use('/api/v1/subscriptions', limiter, subscriptionRouter)// Define routes for subscription management

app.listen(PORT, async () => {
    await connectDB()
    console.log('serveris Live ' + PORT);
})