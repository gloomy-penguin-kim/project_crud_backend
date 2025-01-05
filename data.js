const Department = require('./api/models/department.js')
const Employee = require('./api/models/employee.js')
const VW_Employee_FOJ_Department = require('./api/models/vw_employee_foj_department.js')
const deleteDepartment = require('./api/department/controller.js').delete

const db = require('./db.js')

exports.loadData = () => {
    
Department.deleteMany()
    .then(() => { 
 
Employee.deleteMany()
        .then(() => {
        Employee.create({firstname: "Travis", lastname: "Combs", type:"Clerical", departments: []})
     
        Department.create({ name: "Restorative Dentistry" }).then(data => {
            const restorative_dentistry = data._id
            Employee.create({firstname: "Danny", lastname: "Perez", type:"Medical", departments: [restorative_dentistry]})
        })
        Department.create({ name: "General Dentistry" }).then(data => { 
            const general_denitistry = data._id 
            Employee.create({firstname: "Alfred", lastname: "Christensen", type:"Medical", departments: [general_denitistry]})
            Employee.create({firstname: "John", lastname: "Dudley", type:"Housekeeping", departments: [general_denitistry]})
            Employee.create({firstname: "Janet", lastname: "Doe", type:"Admin", departments: [general_denitistry]})
        }) 
        Department.create({ name: "Pediatric Dentistry" }).then(data => {
            const pediatric_dentistry = data._id 
            Employee.create({firstname: "Fransisco", lastname: "Willard", type:"Medical", departments: [pediatric_dentistry]})
            Employee.create({firstname: "Sarah", lastname: "Alvarez", type:"Medical", departments: [pediatric_dentistry]})
        })
        Department.create({ name: "Surgery" }).then(data => {
            const surgery = data._id  
            Employee.create({firstname: "Constance", lastname: "Smith", type:"Admin", departments: [surgery]})
        })
        setTimeout(() => {
            Department.create({ name: "Orthodontics" }).then(data => {
                const orthodontics = data._id   

                Department.find({ name: "Restorative Dentistry" })
                    .then(data => {
                        console.log("-------------------------", data)
                        const restorative_dentistry = data[0]._id
                        Employee.create({firstname: "Lisa", lastname: "Harris", type:"Medical", departments: [restorative_dentistry, orthodontics]})

                        let req = { params: { id: restorative_dentistry } }
                        res = {
                            send: (function(){ }),
                            json: (function(){ }),
                            status: function(obj) { 
                                return res 
                            }
                        }
                        //deleteDepartment(req, res)

                    }) 
                Employee.create({firstname: "Leslie", lastname: "Roche", type:"Housekeeping", departments: [orthodontics]})


                VW_Employee_FOJ_Department.find().then(data => console.log("VW_Employee_FOJ_Department.find()", data.length))

            })
        } ,1000)
    })
    }) 

}

