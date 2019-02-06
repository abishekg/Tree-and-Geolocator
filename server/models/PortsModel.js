const mongoose = require('mongoose');

const portSchema = new mongoose.Schema({
  name: {
    type: String
  },
  lat: {
    type: String
  },
  lng: {
    type: String
  }
})

var PortsModel = mongoose.model("ports", portSchema);

module.exports = { PortsModel };