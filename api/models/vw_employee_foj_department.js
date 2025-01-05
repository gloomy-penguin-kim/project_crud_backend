const mongoose = require('mongoose')
 

const VW_Employee_foj_DepartmentSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['Admin', 'Medical', 'Clerical', 'Housekeeping'] 
    },
    employeeId: mongoose.Schema.Types.ObjectId,
    
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String } 
}) 

const VW_Employee_FOJ_Department = mongoose.model(
                                        'VW_Employee_FOJ_Department', 
                                        VW_Employee_foj_DepartmentSchema, 
                                        'vw_employee_foj_department');


module.exports = VW_Employee_FOJ_Department  

//VW_Employee_FOJ_Department.find().then(data => console.log("VW_Employee_FOJ_Department.find()", data))
