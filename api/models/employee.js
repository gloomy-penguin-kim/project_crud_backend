const mongoose = require('mongoose')
 

const Employee = mongoose.model('Employee', {     
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { type: String, 
            enum: ['Staff', 'Admin', 'Medical', 'Clerical', 'Housekeeping'] 
    },
    departments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Department'} ]
});

 
module.exports = Employee 


