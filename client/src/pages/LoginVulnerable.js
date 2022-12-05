import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const LoginVulnerable = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
  

    const login = () => {
        axios.post("http://localhost:8888/login", {
        username: username,
        password: password,
      }).then((response) => {
        // if login successful, transition to refine date page
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
    };


    return (
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
                <div className="text-center">
                    <Button 
                        variant="primary" 
                        onClick={login}
                    >
                        Log In
                    </Button>
                </div>
                
            </Form>    
        </Row>
    )
}

export default LoginVulnerable