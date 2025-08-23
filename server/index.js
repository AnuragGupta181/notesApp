import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js'
import authRouter from './routes/auth.js'
import Router from './routes/add-note.js'
import 'dotenv/config';

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/notes', Router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Notes app listening at http://localhost:${PORT}`)
})