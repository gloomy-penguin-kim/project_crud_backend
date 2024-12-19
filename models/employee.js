const mongoose = require('mongoose')
const Department = require('./department.js')
 

const Employee = mongoose.model('Employee', {     
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { type: String, 
            enum: ['staff', 'admin', 'medical', 'clerical', 'housekeeping'] 
    },
    departments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Department'} ]
});

 
module.exports = Employee


Department.find({})
.then(() => {


    Employee.deleteMany({})
    .then(() => {
        Department.find({}).limit(2).then(data => { 
            console.log("to load the user with 2 departments", data) 
            Employee.create({ firstname: "peter", lastname: "burger", type: "medical", departments: [data[0]._id, data[1]._id] })
            Employee.create({ firstname: "clint", lastname: "eastwood", type: "medical", departments: [data[0]._id] })
        })
        Employee.create({ firstname: "kim", lastname: "poppycock", type: "staff", departments: [] })
        .then(data => {

            Employee.find({firstname: "peter"})
            .then(data => {
                console.log("DATA", data)
            }) 
        }) 
    })
  
 

}) 
 

 