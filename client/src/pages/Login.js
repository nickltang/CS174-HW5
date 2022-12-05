import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Login = () => {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    // const [variableName, variableSetter] = useState(<default value>)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
  
    const register = () => {
        axios.post("http://localhost:8888/register", {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };
  
    const login = () => {
        axios.post("http://localhost:8888/login", {
            username: username,
            password: password,
        }).then((response) => {
            // if login successful, transition to refine date page
            // {
            //    user: {
                //      ...
                // }
            // }
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].username);
            }
        });
    };
  
    return (
        <Container>
            <Row>
                <Form >
                    <Form.Group 
                        className="mb-3" 
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <Form.Group 
                        className="mb-3" 
                        controlId="formBasicPassword"
                    >
                        <Form.Label
                            className="text-left"
                        >
                            Password
                        </Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <div className="text-center mt-4">
                        <Button 
                            variant="primary" 
                            // size="lg"
                            onClick={login}
                        >
                            Log In
                        </Button>
                    </div>
                    
                </Form>    
            </Row>
            <Row className="mt-4 text-center">
                <Col>
                    <Button 
                        className="mx-2"
                        size="sm"
                        href="/create-account"
                        variant="outline-secondary"                    
                    >
                        Create Account
                    </Button> 
                    <Button 
                        className="mx-2"
                        size="sm"
                        href="/login-vulnerable"
                        variant='outline-secondary'
                    >
                        Vulnerable Login
                    </Button> 
                </Col>
            </Row>    
        </Container>
    );
}

export default Login