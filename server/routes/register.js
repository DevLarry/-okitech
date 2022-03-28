const bodyParser = require('body-parser');
var express = require('express');
const { users } = require('../db');
const { user } = require('../schemas');
var { Router } = express;
Router = Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json({ extended: true }));
Router.get('/', (req, res) => {
    res.render('register', { message: null })
})


async function registrationHandler(req, res, next) {
    const { email, password, confirm, name } = req.body;
    var status = 'User Registered Successfully!'
    if (confirm !== password) {
        req.out = { status: "PASSNOTMATCH", success: false, message: "Password Does Not Matched!" }
    } else if (user.find({ email }).length >= 1) {
        req.out = { status: "USEREXISTS", success: false, message: "User Already Existed!" }
    } else {
        // users.add({ name, email, password });
        var doc = new user({ name, email, password });
        await doc.save()
            .then(() => {
                req.out = { status: "SUCCESS", success: true, message: "Registeration Successful!" }
            })
            .catch(e => {
                req.out = { status: "ERRUNKNOWN", success: true, message: "Registeration failed! try later!" }
            })
            // res.send('done');
    }
    next();
}

Router.post('/', registrationHandler, (req, res) => {
    if (req.out.success) {
        res.redirect('/login');
    } else {
        res.render('register', { message: req.out.message })
    }

})
module.exports = Router;