const mongoose = require("mongoose");
// import childSchema from './ChildModel.js'

const treeSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true
  },
  lvl: {
    type: Number,
    required: true
  },
  checked: {
    type: Boolean,
    default: false,
    required: true
  },
  expanded: {
    type: Boolean,
    default: false,
    required: true
  },
  parentId: {
    type: String,
  }
});

var TreeModel = mongoose.model("tree", treeSchema);

module.exports = { TreeModel };