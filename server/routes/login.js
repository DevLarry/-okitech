const bodyParser = require("body-parser");
var express = require("express");
const { user } = require("../schemas");
// const { users } = require('../db')

var { Router } = express;
Router = Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json({ extended: true }));
Router.get("/", (req, res) => {
	res.render("login", { err: null });
});

function loginHandler(req, res, next) {
	const { email, password } = req.body;
	user
		.findOne({ email, password })
		.then(doc => {
			if (!doc) {
				req.loggedIn = false;
				req.loggedInStatus = "USERNOTFOUND";
				// req.errMsg = "User does not exist!";
				next();
			} else {
				req.loggedIn = true;
				req.user = doc;
				console.log(doc);
				next();
			}
		})
		.catch(err => {
			req.loggedIn = false;
			req.err = "Cannot load data at the moment!";
			next();
		});
}

Router.post("/", loginHandler, (req, res) => {
	// console.log(req.body);
	if (req.loggedIn) {
		res.render("dashboard", { user: req.user });
	} else {
		res.render("login", {
			err: req.errMsg || "Incorrect Username or password!",
		});
	}
});
module.exports = Router;
