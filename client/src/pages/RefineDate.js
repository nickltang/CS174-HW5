import { useEffect, useState } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Accordion from 'react-bootstrap/Accordion'
import { useNavigate } from 'react-router-dom'
import pfp from '../default-pfp.jpeg'
import axios from "axios"
import Navigation from "../components/Navigation"

const questionsList = [
    'Do you like cooking?',
    'Do you like video games?',
    'Are you a morning person?',
    'Do you have any pets?',
    'Do you like to read?',
    'Do you like to travel?',
    'Do you have siblings?',
    'Are you religious?  ',
    'Do you like horror movies? ',
    'Do you have any tattoos?',
]

const RefineDate = () => {
    const [dateOption, setDateOption] = useState({
        id: "",
        name: "",
        username: "",
        answers: []
    })
    const [showEmail, setShowEmail] = useState(false)
    const [outOfSuggestions, setOutOfSuggestions] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        // Navigating to refine-date when not signed in
        if(localStorage.length === 0 ) {
            console.log('hi')
            navigate('/')
        }

        // Get date suggestion
        axios.post('http://localhost:8888/getSuggestion', {id: localStorage.getItem('userID')}).then((res) => {
            console.log(res.data)
            if(res.data.userInfo === -1) {
                setOutOfSuggestions(true)
            } else {
                setDateOption({
                    id: res.data.userInfo.id,
                    name: res.data.userInfo.name,
                    username: res.data.userInfo.username,
                    answers: JSON.parse(res.data.userInfo.answers)
                })    
            }
            
        }).catch((err) => console.log(err))
    }, [])

    const handleMore = () => {
        const data = {
            current_id: localStorage.getItem('userID'),
            guest_id: dateOption.id
        }
        axios.post('http://localhost:8888/suggestMore', data).then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))
        .then(() => {
            axios.post('http://localhost:8888/getSuggestion', {id: localStorage.getItem('userID')}).then((res) => {
                console.log(res.data)
                if(res.data.userInfo === -1) {
                    setDateOption({})
                    setOutOfSuggestions(true)
                } else {
                    setDateOption({
                        id: res.data.userInfo.id,
                        name: res.data.userInfo.name,
                        username: res.data.userInfo.username,
                        answers: JSON.parse(res.data.userInfo.answers)
                    })
                }
            }).catch((err) => console.log(err))
        })
    }

    const handleLess = () => {
        const data = {
            user_id: localStorage.getItem('userID'),
            suggested_id: dateOption.id
        }
        axios.post('http://localhost:8888/suggestLess', data).then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))
        .then(() => {
            axios.post('http://localhost:8888/getSuggestion', {id: localStorage.getItem('userID')}).then((res) => {
                console.log(res.data)
                if(res.data.userInfo === -1) {
                    setDateOption({})
                    setOutOfSuggestions(true)
                } else {
                    setDateOption({
                        id: res.data.userInfo.id,
                        name: res.data.userInfo.name,
                        username: res.data.userInfo.username,
                        answers: JSON.parse(res.data.userInfo.answers)
                    })
                }
            }).catch((err) => console.log(err))
        })
    }

    const handleReset = () => {
        axios.post('http://localhost:8888/resetSuggestions', {user_id: localStorage.getItem('userID')}).then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))

        setOutOfSuggestions(false)

        axios.post('http://localhost:8888/getSuggestion', {id: localStorage.getItem('userID')}).then((res) => {
            console.log(res.data)
            if(res.data.userInfo === -1) {
                setDateOption({})
            } else {
                setDateOption({
                    id: res.data.userInfo.id,
                    name: res.data.userInfo.name,
                    username: res.data.userInfo.username,
                    answers: JSON.parse(res.data.userInfo.answers)
                })    
            }
            
        }).catch((err) => console.log(err))
    }


    const showAnswers = () => {
        const questionsDisplay = []
        if(outOfSuggestions !== false)
            for(let i = 0; i < 10; i++) {
                questionsDisplay.push(
                    <ListGroup.Item>{questionsList[i]} <strong>{dateOption.answers[i] === 0 ? 'No' : 'Yes'}</strong></ListGroup.Item>
                )
            }

        return <ListGroup className="list-group-flush">{questionsDisplay}</ ListGroup>
    }


    if(outOfSuggestions) {
        return (
            <>
                <Navigation />
                <Container className="text-center">
                    <h1 className="mt-4 mb-3">You have run out of suggestions.</h1>
                    <p>Would you like to reset your suggestions list?</p>
                    <Button onClick={handleReset}>Reset Suggestions</Button>
                </Container>
            </>
        )
    } else {
        return (
            <>
                <Navigation />
                <Container className="justify-content-md-center mt-3 text-center" style={{width: "55%"}}>
                    <h1>Suggested Date</h1>
                    <Row>
                        <Col>
                            <Card className="mx-auto my-4 py-3" style={{ width: '60%' }}>
                                <Card.Body>
                                    <Card.Img variant="top" src={pfp} style={{width: "50%"}}/>
                                    <Card.Title className="my-3">{dateOption.name}</Card.Title>
                                    <Accordion className="my-4">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>View Profile</Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup className="list-group-flush">
                                                    {showAnswers()}
                                                </ ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Button variant="outline-primary" onClick={() => setShowEmail(true)}>Schedule Date</Button>
                                    { showEmail ? 
                                        <p className="mt-4">You can contact {dateOption.name} at <strong>{dateOption.username}</strong> <br />Good luck! :)</p> 
                                        : <></>
                                    }
                                </Card.Body>
                                
                            </Card>
                        </Col>
                        
                    </Row>
                    <Row className="mt-4 text-center">
                        <Col>
                            <Button 
                                variant='danger' 
                                size='lg'
                                onClick={handleLess}
                            >
                                Less Like This
                            </Button>
                        </Col>
                        <Col>
                            <Button 
                                variant='success' 
                                size='lg'
                                onClick={handleMore}
                            >
                                More Like This
                            </Button>                
                        </Col>
                    </Row>
                </Container>
            </>

        )    
    }


    
}

export default RefineDate