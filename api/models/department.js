const mongoose = require('mongoose')

const Department = mongoose.model('Department', {    
    name: { type: String, required: true, unique: true },
});

module.exports = Department

 