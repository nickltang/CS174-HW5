import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Navigation from "../components/Navigation";
import Container from "react-bootstrap/Container";


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
    }

    const vulLogin = () => {
        if (username.length === 0 || password.length === 0){
            alert("Please enter your email and password");
            return;
        }

        window.location = "https://www.youtube.com/watch?v=01e5SAvJfpg";
    };


    return (
        <>
            <Navigation />
            <Container className="justify-content-md-center mt-3" style={{width: "55%"}}>
                <h1 className="text-center mb-4">Welcome to DateMatcher (Vulnerable)</h1>
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
                            <OverlayTrigger
                                placement = "bottom"
                                trigger="click"
                                overlay={vulLogin}
                            >
                                <Button 
                                    variant="primary" 
                                    onClick={login}
                                >
                                Login
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Form>    
                </Row>    
            </Container>
            
        </>
        
    )
}

export default LoginVulnerable