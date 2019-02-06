var { InfiniteloopModel } = require('../models/InfiniteLoopModel.js');
var { mongoose } = require('../db/mongoose');
const faker = require('faker');

module.exports = (app) => {

  app.get('/faker', async (req, res) => {
    console.log("Inside faker");
    const arrVal=[];
    for (var i = 1; i <= 50000; i++) {
      var asdf = {
        id:i,
        county: faker.address.county(),
        email: faker.internet.email(),
        title: faker.name.prefix(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        street: faker.address.streetName(),
        zipCode: faker.address.zipCode(),
        date: faker.date.past().toLocaleString(),
        bs: faker.company.bs(),
        catchPhrase: faker.company.catchPhrase(),
        companyName: faker.company.companyName(),
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence()
      };
      arrVal.push(asdf);
      // var model = new InfiniteloopModel(asdf);
      // await model.save();
    }
    // InfiniteloopModel.findOne({ "county": asdf.county }).then((doc) => {
    //   res.send(doc);
    // });
    res.send(arrVal);
  });

  app.get('/fetch', async (req, res) => {
    console.log("Server Called");
    // await InfiniteloopModel.count().then(doc => {
    //   console.log('doc: ', doc);
    // });
    const doc = await InfiniteloopModel.find();
    console.log("InfinteloopOVER");
    res.send(doc);
  })
}