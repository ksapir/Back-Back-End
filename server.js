const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const routes = require("./controllers");

const PORT = process.env.PORT || 3000;



const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// local

const cors = require("cors")

//DEPLOYED
// heroku created nothing pushed yet

// app.use(cors({
//   origin:["https://there-and-back-again-front.herokuapp.com/"]
// }));

app.use('/',allRoutes);


// routes
app.use(require("./controllers/index2"))
app.use(require("./controllers/"))

app.use("/", routes);





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});