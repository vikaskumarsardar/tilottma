const express = require('express')
const Router = express.Router()
const {createAppointment,getAppointments} = require('../controllers/')
Router.post('/createAppointment',createAppointment)
Router.get('/getAppointments',getAppointments)

module.exports = Router