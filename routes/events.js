const {createEvent} = require('../controllers/')
const express = require('express')
const Router  = express.Router()

Router.post('/createEvent',createEvent)
module.exports = Router
