const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const helmet = require('helmet')  

const db = require('./db.js');  
 
const employee_routes = require("./employee/routes.js")
const department_routes = require("./department/routes.js")


const app = express ();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(helmet())

PORT = process.env.PORT || 8000
var corsOptions = {
    origin: [ "http://localhost:3000", "http://192.168.1.147:3000" ]
}

app.use(cors(corsOptions))
  
app.use("/api/employee", employee_routes);
app.use("/api/department", department_routes);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
})