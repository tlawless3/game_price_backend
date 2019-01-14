import axios from 'axios'
import {
  SteamGame
} from '../db/models'

const fetchAndPopulate = async () => {
  await SteamGame.sync()
  let gameData = await SteamGame.findOne().then(() => null).catch((error) => {
    console.log(error)
  })
  const secondsInDay = 86400
  const lastUpdate = gameData ? (gameData.createdAt - new Date()) * 1000 : 0
  if (!gameData || lastUpdate > secondsInDay) {
    const steamGamesList = await fetchSteamGames()
    populateDb(steamGamesList.data.applist.apps, steamGamesList.data.applist.apps.length)
  }
}

const fetchSteamGames = async () => {
  try {
    const steamGamesList = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json')
    return steamGamesList
  } catch (error) {
    console.log(error);
  }
}

const populateDb = async (games, gamesLength) => {
  try {
    await SteamGame.sync({
      force: true
    })
    const createGames = async (batch, index) => {
      Promise.all(batch.map(async (game) => {
        await SteamGame.create({
          name: game.name,
          appid: game.appid + ''
        })
      })).then(() => {
        if (index < gamesLength) {
          let nextBatch = [];
          for (let i = index;
            (i < index + 15) && i < gamesLength; i++) {
            nextBatch.push(games[i])
          }
          createGames(nextBatch, Number(index) + 15)
        }
      })
    }
    createGames([], 0)
  } catch (error) {
    console.log(error)
  }
}

module.exports = fetchAndPopulate