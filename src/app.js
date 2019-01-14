import '@babel/polyfill'
import express from 'express'
import {
  db
} from './db/models/index'
import services from './services/index'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200
}))

app.use('/api/v1.0.0', require('./api'))

app.use(express.static(path.join(__dirname, 'assets')))

services.populateSteamGames(db)

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});