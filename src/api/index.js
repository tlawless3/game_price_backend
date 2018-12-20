import express from 'express';

const app = express();

app.use('/steamGame', require('./steamGames'));
app.use('/gogGame', require('./gogGames'))

module.exports = app;