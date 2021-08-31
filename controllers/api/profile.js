const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const request = require("request")
const config = require("config")
require ('dotenv').config()
const { check, validationResult} = require("express-validator/check")


module.exports = router