import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schemas/schema';
import {
  db
} from './db/models/index'
import services from './services/index'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
  return response.json({
    msg: 'Hello World'
  })
})

app.get('/populateSteamGames', (req, res, next) => {
  services.populateSteamGames(db)
  return res.json({
    msg: 'working'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});