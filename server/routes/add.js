const bodyParser = require("body-parser");
const express = require("express");
const { user, services } = require("../schemas");

var { Router } = express;
Router = Router();

Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json({ extended: true }));

Router.get("/", (req, res, next) => {
  res.render("add-service");
});
Router.post("/", dist, (req, res, next) => {
  // console.log(req.body);
  new services(req.body)
    .save()
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw err;
    });
  res.render("add-service");
});

function dist(req, res, next) {
  let static = [],
    userDefined = [];
  JSON.parse(req.body.properties).forEach((e) => {
    if (e.value) {
      static.push(e);
    } else {
      userDefined.push(e);
    }
  });
  req.body.properties = { static, userDefined };

  next();
}
module.exports = Router;
