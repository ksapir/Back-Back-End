const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const connectDB = require("./config/db")
//connect to db
const cors = require("cors")
require ('dotenv').config()

// const routes = require("./controllers/api");

const PORT = process.env.PORT || 3001;

const app = express();

// //connect db
//connect db
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//init middleware 
app.use(express.json({extended:false}))

// local
app.use(cors());

// deployed

// app.use(cors({
//   origin:["https://there-and-back-again-front.herokuapp.com"]
// }));



// routes
// app.use(routes)
app.use("/api/users", require("./controllers/api/users"))
app.use("/api/auth", require("./controllers/api/auth"))
app.use("/api/profile", require("./controllers/api/profile"))
app.use("/api/post", require("./controllers/api/post"))
app.use("/api/trails", require("./controllers/api/trails"))

//changed url name**
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/there-and-back-again", {
//    useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// })
// console.log("MongoDB connected"),

//will have to change this to list the the port on the other repo
connectDB.once("open", () => {
  app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
})
