
const Department = require("../models/department.js")
const Employee = require('../models/employee.js')

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

    Department.findById(id)
        .then(data => {
            res.status(201).json( data )
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
    
                console.log("before findByIdAndUpdate", employee)
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
        .addFields({ departmentId: "$_id", _id: "$tacos" })
        .sort({name: 1})
        .exec() 
        .then(data => {
            console.log("department.listAll", data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
}

 