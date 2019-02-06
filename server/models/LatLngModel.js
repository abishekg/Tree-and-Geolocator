const mongoose = require('mongoose');

const latLngSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  fromLocation: {
    type: String
  },
  toLocation: {
    type: String
  },
  imoNumber: {
    type: String
  },
  class: {
    type: String
  },
  cargo: {
    type: String
  },
  wind: {
    type: String
  },
  speed: {
    type: String
  },
  nextPort: {
    type: String
  },
  reportDate: {
    type: String
  }
})

var LatLngModel = mongoose.model("latlng", latLngSchema);

module.exports = { LatLngModel };