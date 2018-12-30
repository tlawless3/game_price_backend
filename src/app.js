import express from 'express'
import {
  db
} from './db/models/index'
import services from './services/index'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express();
const PORT = 3000;

app.use('/api/v1.0.0', require('./api'))

app.use('/populateSteamGames', (req, res, next) => {
  services.populateSteamGames(db)
  return res.json({
    msg: 'working'
  })
})

app.use(express.static(path.join(__dirname, '..', 'assets')))


app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});