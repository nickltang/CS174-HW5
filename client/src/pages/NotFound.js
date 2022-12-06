import React from 'react'
import Navigation from '../components/Navigation'
import Container from 'react-bootstrap/Container'

const NotFound = () => {
  return (
    <>    
      <Navigation />
      <Container className='text-center my-5'>
          <h1>Page not found</h1>   
          <p className='mt-3'>Please navigate to home page to continue</p>
      </Container>
    </>
  )
}

export default NotFound