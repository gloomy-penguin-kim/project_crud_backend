import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react' 

const VWByDepartment = () => { 
  const [employees, setEmployees] = useState([]) 
  const [departments, setDepartments] = useState([])  
  const [heading, setHeading] = useState("View by Department")
  
  const loadEmployees = () => { 
    axiosInstance.get('/api/views/by-employee-foj-department')
      .then(response => {  
          setEmployees(response.data)
      })
      .catch(err => {
        setHeading("Server Error")
        if (err.response?.data) alert(err.response.data)
        console.log(err) 
      })
  } 
  
  useEffect(() => { 
    loadEmployees() 
    axiosInstance.get('/api/department')
      .then(response => {     
          setDepartments(response.data)  
      })
      .catch(err => {
        setHeading("Server Error")
        if (err.response?.data) alert(err.response.data)
        console.log(err) 
      }) 
  }, []) 
 
  return (
    <> 
      <h2>{heading}</h2>  
      {departments.map(department => {
      return (
      <div key={department.name+"_div"}>
        <div key={department.name+"_heading"}><b>{department.name}</b><br/></div>
        <table key={department.name+"_table"}>  
          <tbody>
          {employees?.filter(value => value._id === department._id).map(emp => ( 

            <tr key={emp.employeeId+"_tr"}> 
              {typeof emp.employeeId !== "undefined" && (<>                       
              <td key={emp.employeeId+"_name"} style={{minWidth:'15rem'}}>{emp.lastname}, {emp.firstname}</td> 
              <td key={emp.employeeId+"_type"} style={{minWidth:'10rem'}}>{emp.type}</td> 
              </>
              )}
            </tr>  
          ))}
          </tbody>
        </table><br/>  
        </div>)
      })} 

      {employees?.filter(value => typeof value._id === "undefined").length >0 && (<div key={"unassinged"}><b>Unassigned</b><br/></div>) }
      <table> 
        <tbody>
        {employees?.filter(value => typeof value._id === "undefined").map(emp => (
          <tr key={emp.employeeId+"_unassinged"}> 
            <td key={emp.employeeId+"_name_unassinged"} style={{minWidth:'15rem'}}>{emp.lastname}, {emp.firstname}</td> 
            <td key={emp.employeeId+"_type_unassinged"} style={{minWidth:'10rem'}}>{emp.type}</td> 
          </tr> 
          
        ))}
        </tbody>
      </table> 

    </>
  );
}

export default VWByDepartment