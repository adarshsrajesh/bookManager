import React from 'react'
import { Container, Navbar } from 'react-bootstrap'


const Header = () => {
  return (
    <>
        <Navbar className="bg-info">
        <Container>

              <Navbar.Brand href="#home"  className='fs-2 text-light'>
              <i class="fa-solid fa-book"></i>
                BookManager
              </Navbar.Brand>
      
        </Container>
      </Navbar>
    </>
  )
}

export default Header