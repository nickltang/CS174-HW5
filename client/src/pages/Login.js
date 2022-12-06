import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Navigation from "../components/Navigation";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
  
    const login = () => {
        if (username.length === 0 || password.length === 0){
            alert("Please enter your email and password");
            return;
        }

        axios.post("http://localhost:8888/login", {
            username: username,
            password: password,
        }).then((response) => {
            console.log('POST /login', response)

            if (response.data.userInfo === -1) {
                alert("Username and password did not match.");
            } else if (response.status === 400) {
                alert("Database error. Please try again.");
            } else {
                localStorage.setItem('userID', response.data.userInfo.id)
                navigate('/refine-date')
            }
        }).catch((err) => {
            console.log(err)
        });
    };
  
    return (
        <>
            <Navigation />
            <Container className="justify-content-md-center mt-3" style={{width: "55%"}}>
                <h1 className="text-center mb-4">Welcome to DateMatcher</h1>
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
        </>

    );
}

export default Login