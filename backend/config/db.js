const mongoose = require("mongoose")


 const connection = mongoose.connect('mongodb://0.0.0.0/trying').then(() =>{
  console.log("connected to datbase")
})

module.exports = connection

//const dbConnection = require('./config/db')


//this has issue check it one time