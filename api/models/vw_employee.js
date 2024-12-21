const mongoose = require('mongoose')
 

const VW_EmployeeSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['staff', 'admin', 'medical', 'clerical', 'housekeeping'] 
    },
    employeeId: { type: mongoose.Schema.Types.ObjectId } ,

    departments: [{ type: mongoose.Schema.Types.ObjectId }],
    departmentsName: [ { type: String } ]

}, { collection: 'employees', versionKey: false })

const VW_Employee = mongoose.model('VW_Employee', VW_EmployeeSchema, 'vw_employee');
  
module.exports = VW_Employee 


// [
//     {
//       $unwind: {
//         path: "$departments",
//         preserveNullAndEmptyArrays: true
//       }
//     },
//     {
//       $addFields: {
//         departmentId: "$departments"
//       }
//     },
//     {
//       $lookup: {
//         from: "departments",
//         localField: "departmentId",
//         foreignField: "_id",
//         as: "departmentdInfo"
//       }
//     },
//     {
//       $addFields: {
//         departmentName: {
//           $arrayElemAt: ["$departmentdInfo.name", 0]
//         },
//         departmentId: {
//           $arrayElemAt: ["$departmentdInfo._id", 0]
//         },
//         employeeId: "$_id",
//         departments: "$tacos",
//         department: "$tacos",
//         _id: "$tacos"
//       }
//     },
//     {
//       $sort: {
//         departmentName: 1
//       }
//     },
//     {
//       $group: {
//         _id: {
//           employeeId: "$employeeId",
//           firstname: "$firstname",
//           lastname: "$lastname",
//           type: "$type",
//           _id: "$_id"
//         },
//         departmentsName: {
//           $push: "$departmentName"
//         },
//         departments: {
//           $push: "$departmentId"
//         }
//       }
//     },
//     {
//       $addFields: {
//         firstname: "$_id.firstname",
//         lastname: "$_id.lastname",
//         type: "$_id.type",
//         employeeId: "$_id.employeeId",
//         _id: "$_id.tacos"
//       }
//     },
//     {
//       $sort: {
//         lastname: 1,
//         firstname: 1
//       }
//     }
//   ]