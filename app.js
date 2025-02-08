const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const helmet = require('helmet')  
const path = require('path')

const config = require('./config.js');  
const db = require('./db.js');  
 
const employee_routes = require("./api/employee/routes.js")
const department_routes = require("./api/department/routes.js")
const view_routes = require('./api/views/routes.js')

const app = express ()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

PORT = process.env.PORT || 3001

var corsOptions = {
    origin: [ "http://localhost:3000", "http://192.168.1.147:3000" ]
}

app.use(cors(corsOptions))
  
app.use("/api/employee", employee_routes);
app.use("/api/department", department_routes);
app.use("/api/views", view_routes);
 
const testData = require('./data.js')
 

app.use("/api/reset-data", (req, res) => { 
    testData.loadData()  
    res.status(200).send("data was reset")
})


// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Catch-all route to serve the index.html for any non-static paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});
  
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc:  ["'self'", "cdn.jsdelivr.net", "code.jquery.com"],
        styleSrc:   ["'self'", "cdn.jsdelivr.net"],
      },
    })
)

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
    setTimeout(() => {
        testData.loadData() 
    }, 1000)
})
