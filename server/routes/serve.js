const bodyParser = require("body-parser");
const express = require("express");
const { Router } = express;
// const app = require('../config');
Router = Router();

Router.use(bodyParser.urlencoded());
