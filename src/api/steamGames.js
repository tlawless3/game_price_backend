import express from 'express'
import Sequelize from 'sequelize'
import {
  SteamGame
} from '../db/models'

const Op = Sequelize.Op;
const app = express()

app.get('/:query', (req, res, next) => {
  const query = req.params.query
  SteamGame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`
      }
    }
  }).then(response => {
    console.log(response)
  })
})

module.exports = app