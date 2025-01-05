const mongoose = require('mongoose')
const Department = require("../models/department.js")
const Employee = require('../models/employee.js');
const VW_By_Department = require('../models/vw_by_department.js'); 

exports.create = async (req, res) =>  {
    const { name } = req.body;
    
    if (!name || name == "") { 
        res.status(422).send("input missing or incorrect")
    } 

    const exists = await Department.find({ name: name })
    if (exists.length > 0) {
        res.status(409).send("Department Name already exists") 
        return 
    } 

    Department.create({ name: name })
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        }) 
} 


exports.findById = (req, res) => {
    const id = req.params.id;   

    const objId = new mongoose.Types.ObjectId(id) 

    Department.aggregate() 
        .match({ departmentId: objId })
        .lookup({ from: "vw_by_department", localField: "_id", foreignField: "departmentId", as: "employees" })
        .addFields({ departmentId: "$departmentId", departmentName: "$departmentName", employees: { $size: "$employees" } })
        .exec() 
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        }) 
} 


exports.update = (req, res) => {
    const id = req.params.id;  
    if (!req.body) { 
        res.status(422).send("input missing or incorrect")
    } 
    console.log("here ---------------------")
 

    Department.findByIdAndUpdate(id, req.body)
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        }) 
} 

exports.delete = async (req, res) => {
    const id = req.params.id;    

    await Employee.find({ departments: id })
        .then(employees => {

            employees.forEach(employee => { 
                console.log(employee) 
                const indexOf = employee.departments.indexOf(id)
                employee.departments.splice(indexOf, 1);
     
                Employee.findByIdAndUpdate(employee._id, employee)
                    .then(response => {
                        console.log("Employee.findByIdAndUpdate", response) 
                    })  
            }) 
        })

    await Department.findByIdAndDelete(id)
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        }) 
} 


exports.listAll = (req, res) => {
    Department.aggregate()  
        .lookup({ from: "vw_by_department", localField: "_id", foreignField: "departmentId", as: "employees" })
        .addFields({ employees: { $size: "$employees" }, lower: { $toLower: "$name"} }) 
        .sort({ lower: 1 })
        .exec() 
        .then(data => { 
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
}

 