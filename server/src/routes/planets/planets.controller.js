const {getAllPlanets} = require('../../models/planets.model')

/* need to make this function async b/c getAllPlants is async */
async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets())

}

module.exports = {
  httpGetAllPlanets
}