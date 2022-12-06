import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'


const Navigation = () => {
  const [showSignOut, setShowSignOut] = useState(false)

  useEffect(() => {
    if(localStorage.length > 0 && localStorage.getItem('userID') !== null) {
      setShowSignOut(true)
    }
  }, [])

  const signOut = () => {
    localStorage.clear()
    showSignOut(false)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={signOut} href="/">DateMatcher</Navbar.Brand>
        <Nav>
          {showSignOut ? <Button variant="outline-danger" onClick={signOut}>Sign Out</Button> : <></>}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation