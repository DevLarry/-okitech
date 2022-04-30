const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const app = express();
const login = require("./routes/login");
const register = require("./routes/register");
const pricing = require("./routes/pricing");
const add = require("./routes/add");
const checkout = require("./routes/checkout");
const index = require("./routes/");
// app configurations OK
app.use(cookieParser("OK-secret"));
app.use(express.static(path.normalize(path.join(__dirname, "../public"))));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Routes configurations
app.use("/login", login);
app.use("/pricing", pricing);
app.use("/register", register);
app.use("/checkout", checkout);
// app.get('/pricing.html', (req, res)=>res.redirect('/pricing'))
app.use("/add-service", add);
app.use("/", index);

app.use((err, req, res, next) => {
	res.status(501).send(`<h1>Internal Server error!</h1><br>${err.message}`);
});
module.exports = app;
