import express from 'express'
import axios from 'axios'
import appid from 'appid'

const app = express()

app.get('/name/:query', async (req, res, next) => {
  const query = req.params.query
  const regex = new RegExp(query, 'i')
  let gameList = await appid(regex)
  res.json(gameList)
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