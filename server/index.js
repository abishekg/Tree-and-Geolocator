const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


app.use(bodyParser.json());
app.use(cors());

require('./routes/nodeRoutes')(app);
require('./routes/geolocatorRoutes')(app);
require('./routes/infiniteloopRoutes')(app);
app.get("/", (req, res) => {
  res.send("App Server")
});

app.listen(5000, () => {
  console.log("Server is up in PORT 5000");
});
