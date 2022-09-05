const http = require('http');
const mongoose = require('mongoose');
const app = require ('./app.js')
const {mongoConnect} = require('../src/services/mongo')
const {loadPlanetsData} = require('./models/planets.model')


const PORT = process.env.PORT || 8000;


const server = http.createServer(app);


//calling loadPlanets here before we start listening to server. The reason for this is when we get request from front to get all the planets, the data may not be fully ready. We are using async because loadPlanetsData is a promise.
async function startServer () {
  await mongoConnect()
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}


startServer()