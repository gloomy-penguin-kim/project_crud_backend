import { useEffect, useState } from "react"; 
import axiosInstance from "../utilities/axios";
  
import 'bootstrap/dist/css/bootstrap.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
 
const DepartmentModal = ({ handleCloseCallback, show, setShow, departmentInit  }) => {  
    const [ department, setDepartment ] = useState(departmentInit)  
  
    //console.log("departmentInit", departmentInit)

    useEffect(() => {  
        console.log("set department called again")
        setDepartment(departmentInit) 
    }, [departmentInit]) 
 
    const handleChange = (event) => {
        const { target } = event;
        console.log("HandleChange", target.name)
        console.log("HandleChange", target.value)
        setDepartment((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        })); 
        console.log(department)
      };
 
    const handleClose = () => { 
        if (department._id) { 
            axiosInstance.put('/api/department/' + department._id, department)
            .then(response => { 
                handleCloseCallback() 
            })
            .catch(err => { 
                if (err.response.data) alert(err.response.data)
                else console.log(err) 
            })
        }
        else {  
            axiosInstance.post('/api/department', department)
            .then(response => {  
                handleCloseCallback() 
            })
            .catch(err => {
                if (err.response.data) alert(err.response.data)
                else console.log(err) 
            })
        } 
        setShow(false)
    }
 

    return ( 

    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Department Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <Form.Group> 
                    <Form.Control type="text" name="_id" hidden></Form.Control>

                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        value={department.name} 
                        onChange={handleChange} 
                        required/>  
                </Form.Group>
            </form> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> 
    );
};

export default DepartmentModal 