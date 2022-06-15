const express = require('express')
const Router = express.Router()
const Routes = require('./routes/')
Router.use("/appointments",Routes.appointmentRoutes)
Router.use("/events",Routes.eventRoutes)
module.exports = Router