import express from 'express'
import Sequelize from 'sequelize'
import axios from 'axios'
import {
  SteamGame
} from '../db/models'

const Op = Sequelize.Op;
const app = express()

app.get('/name/:query', (req, res, next) => {
  const query = req.params.query
  SteamGame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`
      }
    }
  }).then(response => {
    res.json(response)
  })
})

app.get('/appid/:query', async (req, res, next) => {
  const query = req.params.query
  try {
    const game = await axios.get(`http://store.steampowered.com/api/appdetails/?appids=${query}`)
    res.json(game.data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = app