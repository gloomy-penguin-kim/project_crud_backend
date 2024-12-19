
const mongoose = require('mongoose')
 

const VW_DepartmentSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['staff', 'admin', 'medical', 'clerical', 'housekeeping'] 
    },
    departmentsName: { type: String },
    departmentId: mongoose.Schema.Types.ObjectId,
    employeeId: mongoose.Schema.Types.ObjectId
}, { collection: 'Employee', versionKey: false })

const VW_Department = mongoose.model('VW_Department', VW_DepartmentSchema);

VW_Department.createCollection({
    viewOn: "departments",
    pipeline: [
        [
            {
              $unwind: {
                path: "$departments",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: "departments",
                localField: "departments",
                foreignField: "_id",
                as: "department"
              }
            },
            {
              $addFields: {
                departmentName: {
                  $arrayElemAt: ["$department.name", 0]
                },
                departmentId: {
                  $arrayElemAt: ["$department._id", 0]
                },
                employeeId: "$_id",
                departments: "$tacos",
                department: "$tacos",
                _id: "$tacos"
              }
            },
            {
              $sort: {
                departmentName: 1,
                type: 1
              }
            }
          ]
    ]
})
.then(() => {
    VW_Department.find({})
    .then(data => {
        console.log("VW_Employee data", data)
    })
})

module.exports = VW_Department 