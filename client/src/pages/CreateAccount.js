import React from 'react'
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
    // Priority 1: Need fields for password (string) and questions ([0, 1, 0, 1, ...])
    const [usernameCreate, setEmail] = useState("");
    const [passwordCreate, setPassword] = useState("");
    const [nameCreate, setName] = useState("")
    const [answersArray, setAnswers] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);

    const navigate = useNavigate();

    // Priority 2: Need an onclick function to check that all fields are filled out, then POST all fields to backend
    // url endpoint: http://localhost:8888/createAccount 
    const createAcc = () => {
        // validate form
        for (let answer of answersArray){
            if (answer === -1){
                alert("Please answer all the questions.");
                return;
            }
        }

        if (usernameCreate.length === 0 || passwordCreate.length === 0 || nameCreate.length === 0){
            alert("Please enter your name, email, and password");
            return;
        }

        console.log(JSON.stringify(answersArray))
        
        //post if form is validated:
        axios.post("http://localhost:8888/createAccount", {
            name: nameCreate,
            username: usernameCreate,
            password: passwordCreate,
            answers: JSON.stringify(answersArray),
        }).then((response) => {
            //save to memory
            localStorage.setItem('userInfo', response.data.userInfo)
            navigate('/login')
        }).catch((err) => {
            console.log(err);
        });        
    }

    return (
        <Row>
            <h1>Create an Account</h1>
            <Form className="mt-3">
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicText"
                >
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicEmail"
                >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicPassword"
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Create a Password" 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Form.Group>
                <h2 className='mt-5'>Account Questions</h2>
                <Form.Group className='mt-3'>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                1. Do you like cooking? 
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[0] = parseInt(e.target.value);   
                                console.log(temp);                         
                                setAnswers(temp);

                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                2. Do you like video games?  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[1] = parseInt(e.target.value); 
                                console.log(temp);                                                      
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value= "1" >Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                3. Are you a morning person?    
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[2] = parseInt(e.target.value); 
                                console.log(temp);                                                       
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                4. Do you have any pets?   
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[3] = parseInt(e.target.value);  
                                console.log(temp);                         
                              
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                5. Do you like to read?   
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[4] = parseInt(e.target.value);  
                                console.log(temp);                         
                              
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                6. Do you like to travel?    
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[5] = parseInt(e.target.value); 
                                console.log(temp);                         
                              
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                7. Do you have siblings?   
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[6] = parseInt(e.target.value);  
                                console.log(temp);                         
                              
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                8. Are you religious?   
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[7] = parseInt(e.target.value);    
                                console.log(temp);                         
                             
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                               9. Do you like horror movies?  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[8] = parseInt(e.target.value);   
                                console.log(temp);                         
                             
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                               10. Do you have any tattoos?   
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { 
                                const temp = answersArray;
                                temp[9] = parseInt(e.target.value);    
                                console.log(temp);                         
                             
                                setAnswers(temp);
                            }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                </Form.Group>
                
                <div className="text-center my-5">
                    <Button 
                        variant="primary" 
                        onClick={createAcc}
                    >
                        Create Account
                    </Button>
                </div>
                
            </Form>    
        </Row>
    )
}

export default CreateAccount