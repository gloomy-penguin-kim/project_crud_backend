import React from 'react'
import axiosInstance from '../utilities/axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; 
 
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



const Contact = () => {  
    const [ sender, setSender ] = useState("")
    const [ senderError, setSenderError ] = useState("")
    const [ message, setMessage ] = useState("")
    const [ messageError, setMessageError ] = useState("")
    
    const navigate = useNavigate() 
    
    const sendMessage = () => {
        if (sender === "") {
            alert("sender cannot be blank")
            return 
        }
        if (message === "") {
            alert("message cannot be blank")
            return 
        }
        axiosInstance.post('/api/views/send-email',
            { sender: sender, message: message }
            )
            .then(response =>{
                alert("Email sent. Thank you!!")
                navigate("/home")
            })
            .catch(err => {
                alert("Email not sent... I apologize!")
                console.log(err) 
            }) 
    }

    const onChangeSender = (event) => {
        const { target } = event 
        setSender(target.value) 

        if (encodeURIComponent(target.value) === "") {
          setSenderError('Email cannot be blank');
        } 
        if (!validateEmail(target.value)) {
          setSenderError('Please enter a valid email address');
        } 
        else {
            setSenderError('');
        }
    }

    const onChangeMessage = (event) => {
        const { target } = event 
        setMessage(target.value) 
        if (encodeURIComponent(target.value) === "")
            setMessageError("Message cannot be blank")
        else {
            setMessageError("")
        }
    }

      return (
        <>
        <section>
            <h2>Contact form</h2><br/>
            <Form>
                <Form.Group> 
                    <label htmlFor='sender'>Your email address:</label>
                    <Form.Control className="col-md-3" type="email" name="sender" id='sender' onChange={onChangeSender} required></Form.Control>
                    <Form.Control.Feedback type="invalid">
                    {senderError}
                    </Form.Control.Feedback>
                    
                    <br/>

                    <label htmlFor='message'>Your message:</label>
                    <Form.Control  
                        className="col-md-5" 
                        as="textarea" 
                        rows={5} 
                        name="message" 
                        id='message' 
                        onChange={onChangeMessage} 
                        isInvalid={!!messageError}
                        required>
                        </Form.Control>
                    <Form.Control.Feedback type="invalid">
                    {messageError}
                    </Form.Control.Feedback>
                    
                    <br/>
                    <Button variant="primary" onClick={sendMessage}>Submit</Button>
                </Form.Group>
            </Form>
        </section>
        </>
      )

}


export default Contact 