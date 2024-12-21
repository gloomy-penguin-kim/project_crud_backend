const express = require('express')
const router = express.Router();   
const controller = require("./controller.js")
 

router.get("/by-department", controller.vw_by_department);  
router.get("/by-employee-type", controller.vw_by_employee_type);  

router.get("/by-unassigned-employees", controller.vw_unassigned_employees); 
 

module.exports = router 
