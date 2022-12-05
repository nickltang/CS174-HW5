import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

// TO DO:
// - Set up sign out function
// - Only show sign out button when signed in
const Navigation = () => {
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">DateMatcher</Navbar.Brand>
        <Nav>
          <Button variant="outline-danger">Sign Out</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation