const express = require('express')
const router = express.Router();   
const controller = require("./controller.js")
const emailer = require("./emailer.js")
  

router.get("/by-employee-foj-department", controller.vw_employee_foj_department); 
router.get("/by-department", controller.vw_by_department);  
router.get("/by-employee-type", controller.vw_by_employee_type);  

router.get("/by-unassigned-employees", controller.vw_unassigned_employees);  
 
router.post("/send-email", emailer.send_email)

module.exports = router 
