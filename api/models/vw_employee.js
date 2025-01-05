const mongoose = require('mongoose')
 
const VW_EmployeeSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['staff', 'admin', 'medical', 'clerical', 'housekeeping'] 
    },
    employeeId: { type: mongoose.Schema.Types.ObjectId } ,

    departments: [{ type: mongoose.Schema.Types.ObjectId }],
    departmentsName: [ { type: String } ]
})

const VW_Employee = mongoose.model('VW_Employee', VW_EmployeeSchema, 'vw_employee');
  
module.exports = VW_Employee 
 