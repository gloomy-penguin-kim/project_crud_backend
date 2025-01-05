const VW_By_Department = require("../models/vw_by_department.js")  
const VW_Employee_FOJ_Department = require('../models/vw_employee_foj_department.js')
const VW_Employee = require('../models/vw_employee.js')

exports.vw_by_department = (req, res) => {
    VW_By_Department.find({}).sort({ departmentName: 1, lastname: 1, firstname: 1 })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
}   

exports.vw_employee_foj_department = (req, res) => {
    console.log("here ------------------------------------------")
    VW_Employee_FOJ_Department
        .find({})
        .sort({ name: 1, lastname: 1, firstname: 1 })
        .then(data => {
            console.log("vw_employee_foj_department", data) 
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
} 
 

exports.vw_by_employee_type = (req, res) => {
    VW_Employee.find({}).sort({ type: 1, lastname: 1, firstname: 1 })
        .then(data => {
            console.log("vw_by_employee_type", data) 
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
}

exports.vw_unassigned_employees = (req, res) => { 
    VW_Employee.find({ "departments": { "$size": 0 } }).sort({ lastname: 1, firstname: 1 })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        }) 
}
 