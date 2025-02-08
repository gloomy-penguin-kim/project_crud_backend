const mongoose = require("mongoose")
require('dotenv').config();

let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;  
const clientOptions = { dbName: process.env.DB_NAME };    
  
const db = mongoose.connect(uri, clientOptions)
    .then(() => {
        // console.log('Connected to database:', mongoose.connection.name) 
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

module.exports = { db: db, mongoose: mongoose } 
