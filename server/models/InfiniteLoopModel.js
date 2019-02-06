const mongoose = require('mongoose');

const infiniteloopSchema = new mongoose.Schema({
  id: { type: Number },
  county: { type: String },
  email: { type: String },
  title: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  street: { type: String },
  zipCode: { type: String },
  bs: { type: String },
  catchPhrase: { type: String },
  companyName: { type: String },
  words: { type: String },
  sentence: { type: String },
});


var InfiniteloopModel = mongoose.model("infiniteloop", infiniteloopSchema);

module.exports = { InfiniteloopModel };