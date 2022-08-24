const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
})

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model('Planet', planetSchema)