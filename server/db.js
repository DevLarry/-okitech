const db = require('../fdb')
const users = new db('users', '/db');
const tasks = new db('tasks', '/db');
const services = new db('services', '/db');
const logs = new db('logs', '/db');

module.exports = { users, tasks, logs, services }