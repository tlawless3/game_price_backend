import express from 'express'
import axios from 'axios'

const app = express()

app.use('/:query', async (req, res, next) => {
  try {
    const query = req.params.query
    const gogGames = await (axios.get(`http://embed.gog.com/games/ajax/filtered?mediaType=game&search=${query}`))
    console.log(await gogGames.data)
  } catch (error) {
    console.error(error)
  }
})

module.exports = app