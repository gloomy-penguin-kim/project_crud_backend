
const Department = require("../models/department.js")

exports.create = (req, res) => {
    const { name } = req.body;
    
    if (!name || name == "") { 
        res.status(422).send("input missing or incorrect")
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

exports.delete = (req, res) => {
    const id = req.params.id;   

    Department.findByIdAndDelete(id)
        .then(data => {
            res.status(201).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        }) 
} 


exports.listAll = (req, res) => {
    Department.find({})
        .then(data => {
            res.status(200).json( data )
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send("server error")
        })
}

 