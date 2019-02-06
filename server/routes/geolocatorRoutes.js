var { LatLngModel } = require('./../models/LatLngModel');

var mongoose = require('../db/mongoose');


module.exports = app => {

  app.get("/getval", (req, res) => {
    LatLngModel.find().then(res1 => {
      console.log('res: ', res1.length);
      res.send(res1)
    });
  });

  app.post("/submitForm", (req, res) => {
    console.log("Hello there");
    var { name, description, type, fromLocation, toLocation, latitude, longitude, imoNumber, cargo, wind, speed, nextPort } = req.body;
    var latlngModel = new LatLngModel({ name, description, type, fromLocation, toLocation, latitude, longitude, imoNumber, cargo, wind, speed, nextPort, class: req.body.class, reportDate: new Date().toLocaleDateString() });
    console.log('latlngModel: ', latlngModel);
    latlngModel.save();
    res.send(latlngModel);

  })

}