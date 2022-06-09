const mongoose = require('mongoose')
const {MONGO_URL} = require('./config/')
const connections = mongoose.connect(MONGO_URL,{ useNewUrlParser: true }).then(res =>{
                console.log(`successfully connected to ${MONGO_URL}`)
}).catch(err=>{
                console.log(`cannot connect to the server ${MONGO_URL}`)
})
module.exports = connections
