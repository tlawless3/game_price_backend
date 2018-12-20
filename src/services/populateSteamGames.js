import axios from 'axios'
import {
  SteamGame
} from '../db/models'

const fetchAndPopulate = async (db) => {
  const steamGamesList = await fetchSteamGames()
  populateDb(steamGamesList.data.applist.apps)
}

const fetchSteamGames = async () => {
  try {
    const steamGamesList = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/')
    return steamGamesList
  } catch (error) {
    console.log(error);
  }
}

const populateDb = (games) => {
  try {
    games.map(game => {
      SteamGame.build({
        name: game.name,
        appid: game.appid + ''
      }).save()
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = fetchAndPopulate