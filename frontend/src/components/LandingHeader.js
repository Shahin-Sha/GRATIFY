import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container } from 'react-bootstrap'
import GratifyLogo from '../images/GratifyLogo.png'

const LandingHeader = () => {
    return (
        <header className='ngoheader' style={{ width: '100%' }}>
            <Navbar bg='dark' variant='dark' expand='lg'>
            <img className='GratifyLogo' src={GratifyLogo} alt='image' />
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Gratify</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>
        </header>
    )
}

export default LandingHeader
