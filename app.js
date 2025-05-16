import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute'
import userRouter from './routes/userRoute'
import subscriptionRouter from './routes/subscriptionRoute'


const app = express()
dotenv.config()

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

const PORT = process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send('Comming from Root')
});

app.listen(PORT, () => {
    console.log('serveris Live ' + PORT);
})