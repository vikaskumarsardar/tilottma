const {createAppointment,getAppointments,getAllAppointments}  = require('./appointment')
const {createEvent} = require('./eventManagement')
module.exports = {
                 createAppointment :createAppointment,
                 getAppointments : getAppointments,
                 getAllAppointments,
                 createEvent,
                 
}