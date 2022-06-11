const express = require('express')
const Router = express.Router()
const {createAppointment,getAppointments,getAllAppointments} = require('../controllers/')
Router.post('/createAppointment',createAppointment)
Router.get('/getAppointments',getAppointments)
Router.get('/getAllAppointments',getAllAppointments)

module.exports = Router