
const mongoose = require('mongoose')
 

const VW_DepartmentSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['Admin', 'Medical', 'Clerical', 'Housekeeping'] 
    },
    
    employeeId: mongoose.Schema.Types.ObjectId,

    departmentsName: { type: String },
    departmentId: mongoose.Schema.Types.ObjectId,

}, { collection: 'employees', versionKey: false })

const VW_Department = mongoose.model('VW_Department', VW_DepartmentSchema, 'vw_by_department');
 

module.exports = VW_Department 

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