import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server listening at port ${port}...`))

    console.log('MongoDB successfully connected!')
  })
  .catch((err) => console.log(err))

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
