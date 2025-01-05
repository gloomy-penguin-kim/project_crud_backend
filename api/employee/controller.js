const mongoose = require("mongoose")

const Employee = require("../models/employee.js"); 
const VW_Employee = require("../models/vw_employee.js") 

exports.create = (req, res) => {
    const { firstname, lastname, type, departments } = req.body; 
 
    if (!firstname || firstname == "") {
        res.status(422).end("firstname cannot be empty")
        return 
    }
    if (!lastname || lastname == "") {
        res.status(422).end("lastname cannot be empty")
        return 
    }
    if (!type || type == "") {
        res.status(422).end("employee type cannot be empty")
        return 
    }
    if (departments && !Array.isArray(departments)) {
        console.lof(departments)
        console.log(typeof departments)
        res.status(422).end("department list needs to be an array")
        return 
    }

    Employee.create({ firstname: firstname, lastname: lastname, type: type, departments: departments })
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
} 

exports.listAll = (req, res) => {
    VW_Employee.find({}).sort({ lastname: 1, firstname: 1 })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
}

exports.findById = (req, res) => {
    const id = req.params.id; 

    VW_Employee.find({ employeeId: id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
                console.log(err) 
                res.status(500).send("server error")
        });
}
  
exports.update = (req, res) => {
    const { firstname, lastname, type, departments } = req.body; 
    const id = req.params.id; 
 
    if (!firstname || firstname == "") res.status(422).end("firstname cannot be empty")
    if (!lastname || lastname == "") res.status(422).end("lastname cannot be empty")
    if (!type || type == "") res.status(422).end("employee type cannot be empty")
    if (departments && typeof departments != 'object') {
        res.status(422).end("department list needs to be an array")
    }  

    const objid = new mongoose.Types.ObjectId(id) 

    Employee.findOneAndUpdate(objid, { firstname: firstname, lastname: lastname, type: type, departments: departments })
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })

} 

exports.delete = (req, res) => {
    const id = req.params.id; 
    const objid = new mongoose.Types.ObjectId(id) 
  
    Employee.findByIdAndDelete(objid)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
                console.log(err) 
                res.status(500).send("server error")
        });
}

