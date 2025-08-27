import React from 'react'
import { Container,Alert } from 'react-bootstrap'
const NotFound = () => {
  return (
    <Container className='mt-5'>
    <Alert variant="danger">
      <p>Not Found Sorry !!</p>
    </Alert>
    </Container>
  )
}

export default NotFound
