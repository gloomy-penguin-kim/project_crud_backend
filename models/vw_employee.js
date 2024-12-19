const mongoose = require('mongoose')


const DepartmentsObjSchema = new mongoose.Schema({
    departmentsName: { type: String } , 
    departmentsId:   { type: mongoose.Schema.Types.ObjectId } 
}) 

const VW_EmployeeSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    type:      { type: String, enum: ['staff', 'admin', 'medical', 'clerical', 'housekeeping'] 
    },
    departmentsName: [ { type: String } ],
    departmentsObj: [ DepartmentsObjSchema ],
    employeeId: { type: mongoose.Schema.Types.ObjectId } 
}, { collection: 'Employee', versionKey: false })

const VW_Employee = mongoose.model('VW_Employee', VW_EmployeeSchema);

VW_Employee.createCollection({
    viewOn: "employees",
    pipeline: [
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
        departmentsObj: {
          departmentName: {
            $arrayElemAt: ["$department.name", 0]
          },
          departmentId: {
            $arrayElemAt: ["$department._id", 0]
          }
        },
        employeeId: "$_id",
        departments: "$tacos",
        department: "$tacos",
        _id: "$tacos"
      }
    },
    {
      $sort: {
        departmentName: 1
      }
    },
    {
      $group: {
        _id: {
          employeeId: "$employeeId",
          firstname: "$firstname",
          lastname: "$lastname",
          type: "$type"
        },
        departmentsObj: {
          $addToSet: {
            $cond: [
              {
                $eq: ["$departmentsObj", {}]
              },
              "$$REMOVE",
              "$departmentsObj"
            ]
          }
        },
        departmentsName: {
          $addToSet: "$departmentName"
        }
      }
    },
    {
      $addFields: {
        firstname: "$_id.firstname",
        lastname: "$_id.lastname",
        type: "$_id.type",
        employeeId: "$_id.employeeId",
        _id: "$tacos"
      }
    },
    {
      $project: {
        departmentsName: 1,
        departmentsObj: 1,
        firstname: 1,
        lastname: 1,
        type: 1,
        employeeId: 1
      }
    },
    {
      $sort: {
        lastname: 1,
        firstname: 1
      }
    }
  ]
})
.then(() => {
    VW_Employee.find({})
    .then(data => {
        console.log("VW_Employee data", data)
    })
})


module.exports = VW_Employee 