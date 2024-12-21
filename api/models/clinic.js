const mongoose = require('mongoose')

const Clinic = mongoose.model('Clinic', {   
    name: { type: String, required: true, unique: true },
    // phone: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // address: { type: String, required: true, unique: true }, 
});

module.exports = Clinic
 
Clinic.find({name: "Apollonia Dental Practice"})
    .then(data => {
        if (data.length == 0) {
            Clinic.create({ name: "Apollonia Dental Practice"})
        }
    })
    .catch(err => {
        console.log(err) 
    })