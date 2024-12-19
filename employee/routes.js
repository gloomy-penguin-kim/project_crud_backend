const express = require('express')
const router = express.Router();  

const controller = require("./controller.js")
 
router.post("/", controller.create);
router.get("/", controller.listAll); 
router.get("/:id", controller.findById) 
router.put("/:id", controller.update); 
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete); 

module.exports = router 
