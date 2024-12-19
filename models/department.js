const mongoose = require('mongoose')

const Department = mongoose.model('Department', {   
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    name: { type: String, required: true, unique: true },
    // phone: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // address: { type: String, required: true, unique: true }, 
});

module.exports = Department

Department.deleteMany({})
    .then(() => {

        Department.create({ name: "General Dentistry" }) 
        Department.create({ name: "Pediatric Dentistry" })
        Department.create({ name: "Restorative Dentistry" })
        Department.create({ name: "Surgery" })
        Department.create({ name: "Orthodontics" })
        
        Department.find({})
        .then(data => console.log("DATA", data))


    })
