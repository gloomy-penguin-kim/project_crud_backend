const mongoose = require('mongoose')
 

const VW_By_Department_Schema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['Admin', 'Medical', 'Clerical', 'Housekeeping'] 
    },
    employeeId: mongoose.Schema.Types.ObjectId,
    
    departmentId: mongoose.Schema.Types.ObjectId,
    departmentsName: { type: String } 

}, { collection: 'employees', versionKey: false })

const VW_By_Department = mongoose.model('VW_By_Department', VW_By_Department_Schema, 'vw_by_department');


module.exports = VW_By_Department  


// [
//     {
//       $unwind: {
//         path: "$departments",
//         preserveNullAndEmptyArrays: true
//       }
//     },
//     {
//       $lookup: {
//         from: "departments",
//         localField: "departments",
//         foreignField: "_id",
//         as: "department"
//       }
//     },
//     {
//       $addFields: {
//         departmentName: {
//           $arrayElemAt: ["$department.name", 0]
//         },
//         departmentId: {
//           $arrayElemAt: ["$department._id", 0]
//         },
//         employeeId: "$_id",
//         departments: "$tacos",
//         department: "$tacos",
//         _id: "$tacos"
//       }
//     },
//     {
//       $sort: {
//         lastname: 1,
//         firstname: 1
//       }
//     }
//   ]