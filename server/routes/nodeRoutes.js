const fs = require('fs');
const _ = require('lodash');
const treeSearch = require('tree-search');
var {
  TreeModel
} = require('../models/TreeModel');
var mongoose = require('../db/mongoose');


module.exports = app => {


  app.post('/addnode', async (req, res) => {
    valueURL = '';
    loopCount = 0;
    isValueAdded = false;
    valueAlreadyExists = false;
    var notes = await fetchJSON();
    if (!req.body.parentValue) {
      const find = treeSearch("children", "label");
      const value = find(notes, req.body.label);
      if (!value) {
        notes.push({
          label: req.body.label,
          value: req.body.label,
          lvl: 1
        });
        var modelTree = new TreeModel({
          "label": req.body.label,
          "value": req.body.label,
          "lvl": 1
        });
        modelTree.save();
        writeJSON(notes);
        res.send(notes);
      }
    } else {
      await duplicateCheck(notes, req.body.parentValue, req.body.label);
      if (!valueAlreadyExists) {
        var newObject = {};
        newObject.value = req.body.parentValue + '/' + req.body.label;
        newObject.label = req.body.label;
        newObject.lvl = (newObject.value).split('/').length;
        valueURL = '';
        loopCount = 0;
        isValueAdded = false;
        addChildren(notes, newObject, req.body.parentValue);
        await writeJSON(notes);
        var newNode = await fetchJSON();
        res.send(newNode);

      } else {
        var newNode = fetchJSON();
        res.send(newNode);

      }
    }
  });

  app.get('/fetchnode', (req, res) => {

    var nodes = fetchJSON();
    res.send(nodes)

  });

  app.post("/removenode", async (req, res) => {
    var notes = fetchJSON();
    valueURL = '';
    loopCount = 0;
    isValueAdded = false;
    await removeNode(notes, req.body.value);
    await writeJSON(notes);
    var newNode = await fetchJSON();
    res.send(newNode);
  });

  app.post("/modify", async (req, res) => {
    var notes = fetchJSON();
    valueURL = '';
    loopCount = 0;
    isValueAdded = false;
    newValue = "";
    await modifyJSON(notes, req.body.value, req.body.newLabel);
    await writeJSON(notes);
    var newNode = await fetchJSON();
    res.send(newNode);
  });


  var modifyJSON = (parsedJSON, value, newLabel) => {
    var splitValue = value.split('/');
    var arrayIndex = 0;
    parsedJSON.filter(async x => {
      if (isValueAdded == false) {
        if (loopCount == 0)
          valueURL = splitValue[loopCount];
        else
          valueURL = valueURL + '/' + splitValue[loopCount];
        isValueAdded = true;
      }
      if (x.value == valueURL) {
        loopCount++;
        isValueAdded = false;
        if (parsedJSON[arrayIndex].value === value) {
          for (let i = 0; i < parsedJSON.length; i++) {
            if (parsedJSON[i].label === newLabel) {
              valueAlreadyExists = true;
              break;
            } else {
              valueAlreadyExists = false;
            }
          }
          if (!valueAlreadyExists) {
            if (!newValue)
              parsedJSON[arrayIndex].value = newLabel;
            else
              parsedJSON[arrayIndex].value = newValue + '/' + newLabel;
            TreeModel.updateOne({ "label": parsedJSON[arrayIndex].label, "lvl": loopCount }, { $set: { "label": newLabel, "value": parsedJSON[arrayIndex].value } }, { new: true }, function (err, doc) {
              if (err) {
                console.log('err: ', err);
              }
              console.log('doc: ', doc);
            });
            parsedJSON[arrayIndex].label = newLabel;
            if (parsedJSON[arrayIndex].children)
              modifyWholeJSON(parsedJSON[arrayIndex].children, newLabel, loopCount);
            return false;
          }
        }
        newValue = x.value;
        modifyJSON(x.children, value, newLabel);
      }
      arrayIndex += 1;
    });
  }


  modifyWholeJSON = (updatedJSON, newValue, loopCount) => {
    updatedJSON.filter(branch => {
      var splitVal = branch.value.split('/');
      splitVal[loopCount - 1] = newValue;
      branch.value = splitVal.join('/');
      console.log('branch.value: ' + branch.value + "     " + branch.label);
      TreeModel.updateOne({ "label": branch.label }, { $set: { "value": branch.value } });
      if (branch.children) {
        modifyWholeJSON(branch.children, newValue, loopCount);
      }
    })
  }


  var fetchJSON = () => {
    try {
      var jsonTree = fs.readFileSync('tree-layout.json');
      var parsedJSON = JSON.parse(jsonTree);
      return parsedJSON;
    } catch (error) {
      return error;
    }
  }

  var valueURL = '';
  var loopCount = 0;
  var isValueAdded = false;
  var valueAlreadyExists = false;
  var parent_id = "";
  var removedValue;
  var newValue = "";
  var writeJSON = (tree) => {
    fs.writeFileSync('tree-layout.json', JSON.stringify(tree));
  };

  var addChildren = (parsedJSON, obj, value) => {
    var splitValue = value.split('/');
    parsedJSON.filter(async x => {
      if (isValueAdded == false) {
        if (loopCount == 0)
          valueURL = splitValue[loopCount];
        else
          valueURL = valueURL + '/' + splitValue[loopCount];
        isValueAdded = true;
      }
      if (x.value == valueURL) {
        loopCount++;
        isValueAdded = false;
        if (loopCount == splitValue.length) {
          if (!x.children) {
            x.children = [];
          }
          x.children.push(obj);
          console.log('x: ', x);
          var modelTree = new TreeModel(obj);
          console.log('obj: ', obj);
          await modelTree.save();
          TreeModel.findOne({ "label": x.label }, function (err, doc) {
            if (doc) {
              TreeModel.updateOne({ "label": obj.label, "lvl": obj.lvl }, { $set: { "parentId": doc._id } }).exec();
            }
          })
          valueURL = '';
          loopCount = 0;
          isValueAdded = false;
        } else
          addChildren(x.children, obj, value);
      }
    });
  }

  var removeNode = (_parsedJson, value) => {
    var splitValue = value.split('/');
    var arrayIndex = 0;
    _parsedJson.filter(async x => {
      if (isValueAdded == false) {
        if (loopCount == 0)
          valueURL = splitValue[loopCount];
        else
          valueURL = valueURL + '/' + splitValue[loopCount];
        isValueAdded = true;
      }
      if (x.value == valueURL) {
        loopCount++;
        isValueAdded = false;
        if (_parsedJson[arrayIndex].value === value) {
          if (!_parsedJson[arrayIndex].children) {
            TreeModel.deleteOne({
              "label": _parsedJson[arrayIndex].label
            }).exec();
            removedValue = await _parsedJson.splice(arrayIndex, 1);
            console.log('removedVAlue: ', removedValue);
            return false;
          } else {
            if (_parsedJson[arrayIndex].children.length === 0) {
              removedValue = await _parsedJson.splice(arrayIndex, 1);
              TreeModel.deleteOne({
                "label": _parsedJson[arrayIndex].label
              }).exec();
              return false;
            }
          }
        }
        removeNode(x.children, value);
      }
      arrayIndex += 1;
    });
  }

  // var removeDB = (removedJSON) => {
  //   removedJSON.filter(async branch => {
  //     console.log('branch: ', branch);
  //     const res =
  //       console.log("RES:", res);
  //     if (res) {
  //       console.log(":Value Removed" + branch.label);
  //       console.log("---------------------------------------------");
  //       if (branch.children) {
  //         removeDB(branch.children);
  //       }
  //     }
  //   })
  // }

  var duplicateCheck = (_parsedJson, value, objValue) => {
    var splitValue = value.split('/');
    _parsedJson.filter(x => {
      if (isValueAdded == false) {
        if (loopCount == 0)
          valueURL = splitValue[loopCount];
        else
          valueURL = valueURL + '/' + splitValue[loopCount];
        isValueAdded = true;
      }
      if (x.value == valueURL) {
        loopCount++;
        isValueAdded = false;
        if (loopCount == splitValue.length) {
          if (!x.children) {
            valueAlreadyExists = false;
            return false;
          } else {
            for (let i = 0; i < x.children.length; i++) {
              if (x.children[i].label === objValue) {
                valueAlreadyExists = true;
                break;
              } else {
                valueAlreadyExists = false;
              }
            }
          }
        }
        duplicateCheck(x.children, value, objValue);
      }
    });
  }

  app.post("/duplicatecheck", (req, res) => {
    var notes = fetchJSON();
    valueURL = '';
    loopCount = 0;
    isValueAdded = false;
    if (!req.body.value) {
      console.log("Null Value");
    }
    const find = treeSearch("children", "label");
    const value = find(notes, "ShipPalm");
    if (!value) {
      console.log("Null Value Found");
    }
    res.send(value)
  });




  app.get("/filter", (req, res) => {
    var notes = fetchJSON();
    filterCheck(notes);
    res.send("VALUE");
  })

  var filterCheck = (parsedJSON, ) => {

  }


}