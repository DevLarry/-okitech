const bodyParser = require("body-parser");
var express = require("express");
const { ObjectId } = require("mongodb");
const { services } = require("../schemas");

// const { users } = require("../db");
var { Router } = express;
Router = Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json({ extended: true }));

Router.post("/", async (req, res, next) => {
  var doc = await services
    .findById(req.body.id)
    .then((e) => e)
    .catch((err) => {
      throw err;
    });
  res.render("checkout", { doc });
});

module.exports = Router;
