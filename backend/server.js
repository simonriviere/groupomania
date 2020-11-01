const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path =  require('path');
const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();
/*Pour supprimer des tables existante 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */
// simple route
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/imagesProfile', express.static(path.join(__dirname, 'imagesProfile')));

require("./routes/article")(app); 
require("./routes/user")(app);
require("./routes/com")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});