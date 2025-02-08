import React from 'react'
import axiosInstance from '../utilities/axios'

const Home = () => {  

      const reloadData = () => {
        axiosInstance.get('/api/reset-data')
          .then(response =>{
            alert("Data reset")
          })
          .catch(err => {
            alert("Data not reset...")
          }) 
      }

      const preformatted = `
{
"name": "project_crud_nodejs_mogodb",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": { 
    "start": "node app.js"
  },
  "author": "gloomy.penguin.kim@gmail.com", 
  "description": "Full stack Demo",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "helmet": "^8.0.0",
    "mailersend": "^2.3.0",
    "mongoose": "^8.9.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
      `;

      return (
        <div className="contaiiner">
        <h2>Welcome to the Employee Department Website!</h2> 
        <br/>
        <p>
          Please click <button onClick={reloadData}>here</button> to reload the test data (for everyone). 
        </p>
        <p>
          Employees have one employee type (clerical, medical, housekeeping, etc) and can belong to zero or many departments. I use MongoDB, NodeJS, Express, and React in this project. 
        </p>
        <p>
          <a href="https://www.coursera.org/projects/showcase-build-a-crud-nodejs-and-mongodb-employee-management-web-app">Project Outline on Coursera</a>.  
        </p>
        <p>
          <pre>
{preformatted}
          </pre>
        </p>
        </div>
      )

}


export default Home 