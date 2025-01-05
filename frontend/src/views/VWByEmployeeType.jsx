import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react' 

import LoadingModal from './LoadingModal';

import 'bootstrap/dist/css/bootstrap.css';

const VWByEmployeeType = () => {  
    const employeeTypes = ['Admin', 'Medical', 'Clerical', 'Housekeeping'];
    const [employees, setEmployees] = useState([])  
    const [heading, setHeading] = useState("View by Department")

    const [loading, setLoading] = useState(true); 
    
    const loadEmployees = () => { 
        axiosInstance.get('/api/views/by-employee-type')
        .then(response => { 
            setEmployees(response.data)  
        })
        .catch(err => {
          setHeading("Server Error")
          if (err.response?.data) alert(err.response.data)
          console.log(err) 
        })
        .finally(() => { 
          setLoading(false) 
        })
    } 
  
    useEffect(() => { 
        loadEmployees()  
    }, []) 
 
  return (
    <>
    <section>
      <h2>{heading}</h2>  
      {employeeTypes.map(employeeType => (
      <>
        <span key={employeeType+"_heading_"}><b>{employeeType}</b></span><br/>  
        <table key={employeeType+"_table_"}> 
          <tbody key={employeeType+"_table_body"}>
            {employees.filter(obj => obj.type.toLowerCase() === employeeType.toLowerCase()).map((emp, empi) => (
              <tr key={employeeType+"_tr_"+emp.employeeId}> 
                <td key={employeeType+"_emp_name_"+emp.employeeId} style={{minWidth:'15rem'}}>{emp.lastname}, {emp.firstname}</td> 
                <td key={employeeType+"_emp_depts_"+emp.employeeId} style={{minWidth:'15rem'}}>{emp.departmentsName.join(', ')}</td> 
              </tr> 
            ))}
          </tbody>
        </table><br/> 
      </>
      ))}  
    </section>   

    <LoadingModal loading={loading}/>
 
    </>
  );
}

export default VWByEmployeeType