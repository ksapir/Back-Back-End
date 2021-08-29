const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
//connect to deb****
const connectDB = require("./config/db")

const routes = require("./controllers");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//init middleware ****
app.use(express.json({extended:false}))


// routes**
app.use(routes)

//changed url name**
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/there-and-back-again", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//will have to change this to list the the port on the other repo
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});