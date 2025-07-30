const mongoose = require("mongoose") 
require('dotenv').config();
//const config = require('./config.js');  

let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;  
const clientOptions = { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true };    

console.log(uri); 
  
const db = mongoose.connect(uri, clientOptions)
    .then(() => {
        // console.log('Connected to database:', mongoose.connection.name) 

            const db = mongoose.connection.db;
            db.listCollections({ name: 'departments' }).toArray(function (err, collections) {
                if (err) {
                    console.error(err);
                } else if (collections.length > 0) {
                    console.log(`Collection 'departments' exists.`);
                } else {
                    console.log(`Collection 'departments' does not exist.`);
                }
            });

    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

module.exports = { db: db, mongoose: mongoose } 
