import React from 'react'
import './head.css'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

const Head = () => {

    return (
        <Navbar className='nav-blue' data-bs-theme="dark">
            <Container>
                <Navbar.Brand className='nav-font'>
                    <img
                        alt="logo"
                        src="favicon.ico"
                        width={75}
                        height={75}
                    /> {'   '}
                    AniLove
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Head