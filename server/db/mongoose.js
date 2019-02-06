var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://abishekg:qwerty12345@ds145752.mlab.com:45752/tree-app", {
  useNewUrlParser: true,
  reconnectTries:100,
  autoReconnect:true,
  
}).catch(err=>{
  console.log('err: ', err);
})

module.exports = { mongoose };
