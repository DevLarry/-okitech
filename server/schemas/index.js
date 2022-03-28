const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// const { services } = require('../db');
mongoose.connect(
	"mongodb://127.0.0.1:27017/Okitech",
	err => err && console.log(err.message)
);
const { model, Schema } = mongoose;

const logSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	userId: {
		type: ObjectId,
		required: true,
	},
	summary: {
		type: String,
	},
	price: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
	image: {
		type: String,
	},
});

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: false,
	},
	JoinDate: {
		type: Date,
		default: Date.now(),
		trim: true,
		required: true,
	},
});

const serviceSchema = new Schema({
	name: {
		type: String,
		trim: true,
	},
	price: {
		type: String,
		required: true,
		trim: false,
	},
	properties: {
		type: Object,
		trim: true,
		required: true,
	},
	description: {
		type: String,
		required: false,
		trim: true,
	},
	formula: {
		type: String,
		trim: true,
	},
});

const services = model("services", serviceSchema);
const log = model("logs", logSchema);
const user = model("users", userSchema);

module.exports = { log, user, services };
