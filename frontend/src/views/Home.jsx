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

      return (
        <>
        <h2>Welcome to the Employee Department Website!</h2> 
        <br/>
        <p>
          Please click <button onClick={reloadData}>here</button> to reload the test data (for everyone). 
        </p>
        <p>
          Employees have one employee type (clerical, medical, housekeeping, etc) and can belong to zero or many departments. 
        </p>
        <p>
          <a href="https://www.coursera.org/projects/showcase-build-a-crud-nodejs-and-mongodb-employee-management-web-app">Project Outline on Coursera</a>
        </p>
        </>
      )

}


export default Home 