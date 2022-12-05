import React from 'react'
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const CreateAccount = () => {
    // Priority 1: Need fields for password (string) and questions ([0, 1, 0, 1, ...])
    const [email, setEmail] = useState("")

    // Priority 2: Need an onclick function to check that all fields are filled out, then POST all fields to backend
    // url endpoint: http://localhost:8888/createAccount
    const createAcc = () => {

    }

    return (
        <Row>
            <h1>Create an Account</h1>
            <Form className="mt-3">
                <Form.Group 
                    className="mb-3" 
                    controlId="formBasicEmail"
                >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter your email" 
                        onChange={(e) => {
                            setEmail(e.target.value)
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
                        }}
                    />
                </Form.Group>
                <h2 className='mt-5'>Account Questions</h2>
                <Form.Group className='mt-3'>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 1  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => { }}>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 2  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 3  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 4  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 5  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 6  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 7  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 8  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 9  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col>
                            <Form.Label>
                                Question 10  
                            </Form.Label>            
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Select>            
                        </Col>
                    </Row>
                </Form.Group>
                
                <div className="text-center my-5">
                    <Button variant="primary" onClick={createAcc}>Create Account</Button>
                </div>
                
            </Form>    
        </Row>
    )
}

export default CreateAccount