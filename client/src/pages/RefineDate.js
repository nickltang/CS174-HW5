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
    'question 1',
    'question 2',
    'question 3',
    'question 4',
    'question 5',
    'question 6',
    'question 7',
    'question 8',
    'question 9',
    'question 10',
]

const RefineDate = () => {
    const [dateOption, setDateOption] = useState({
        name: "Joe Shmoe",
        username: "joe@gmail.com",
        answers: [0, 1, 0, 0, 0, 1, 1, 1, 0, 1]
    })
    // const [dateOption, setDateOption] = useState()
    const [showEmail, setShowEmail] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.length === 0 ) {
            console.log('hi')
            navigate('/')
        }

        // Get date suggestion
        axios.post('http://localhost:8888/getSuggestion', {id: localStorage.getItem('userID')}).then((res) => {
            console.log(res.data)
            
        })
    }, [])

    // TO DO: post to /suggestMore
    const handleMore = () => {
        const data = {
            dateName: dateOption.username,
            userName: 'bobsmith@gmail.com'
            // userName: localStorage.getItem('userID')
        }
        axios.post('http://localhost:8888/suggestMore', data).then((res) => {
            console.log(res.data)
        })
    }

    // TO DO: post to /suggestLess
    const handleLess = () => {
        const data = {
            dateName: dateOption.username,
            userName: 'bobsmith@gmail.com'
            // userName: localStorage.getItem('userID')
        }
        axios.post('http://localhost:8888/suggestLess', data).then((res) => {
            console.log(res.data)
        })
    }

    // TO DO: post to /resetSuggestions
    const handleReset = () => {
        const data = {
            userName: 'bobsmith@gmail.com'
            // userName: localStorage.getItem('userID')
        }
        axios.post('http://localhost:8888/resetSuggestions', data).then((res) => {
            console.log(res.data)
        })
    }


    const showAnswers = () => {
        const questionsDisplay = []
        for(let i = 0; i < 10; i++) {
            questionsDisplay.push(
                <ListGroup.Item>{questionsList[i]}: {dateOption.answers[i] === 0 ? 'No' : 'Yes'}</ListGroup.Item>
            )
        }

        return <ListGroup className="list-group-flush">{questionsDisplay}</ ListGroup>
    }


    if(dateOption === {} || dateOption === undefined || dateOption === null) {
        return (
            <Container className="text-center">
                <h1 className="mt-4 mb-3">You have run out of suggestions.</h1>
                <p>Would you like to reset your suggestions list?</p>
                <Button onClick={handleReset}>Reset Suggestions</Button>
            </Container>
        )
    }


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
                                    <p className="mt-4">You can contact {dateOption.name} at <strong>{dateOption.email}</strong> <br />Good luck! :)</p> 
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

export default RefineDate