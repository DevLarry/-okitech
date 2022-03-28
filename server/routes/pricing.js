const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");
var express = require("express");
const { user, services } = require("../schemas");
var { Router } = express;
Router = Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json({ extended: true }));

Router.get("/", render, (req, res, next) => {
  res.render("pricing", { services: req.services });
});

async function render(req, res, next) {
  await services
    .find({})
    .limit(10)
    .then((doc) => {
      req.services = doc.map((e) => {
        return { id: e._id.toString(), name: e.name, price: e.price };
      });
    })
    .catch((err) => {
      throw err;
    });
  next();
}
module.exports = Router;
