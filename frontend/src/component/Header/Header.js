import './Header.css'

import { useSelector, useDispatch } from 'react-redux';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useState } from 'react';

const Header = () => {
    const [expanded, setExpanded] = useState(false)
    
    const dispatch = useDispatch()
    const toggleExpanded = () => { if(window.innerWidth < 768) setTimeout(() => setExpanded(prev => !prev), 100) }

    return (
        <Navbar sticky='top' className='p-1 header' expand='md' expanded={expanded}>
            <Navbar.Brand className='ms-3 me-3'>
                <img src="./favicon.gif" className='header-logo' alt='AniLove Logo'/>
            </Navbar.Brand>
            <Navbar.Text className='header-title me-5'>AniLove</Navbar.Text>

            <Navbar.Collapse className='header-collapse'>
                <Nav.Link as={Link} to='/' className='me-5 text-center' onClick={toggleExpanded}>
                    Rate
                </Nav.Link>
                <Nav.Link as={Link} to='/History' className='me-5 text-center' onClick={toggleExpanded}>
                    History
                </Nav.Link>
                <Nav.Link as={Link} to='/Recommend' className='me-5 text-center' onClick={toggleExpanded}>
                    Recommend
                </Nav.Link>
            </Navbar.Collapse>

            <Navbar.Toggle onClick={toggleExpanded}/>
        </Navbar>
    )
    //     <Navbar collapseOnSelect expand="xxl">
    //         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse id="responsive-navbar-nav">
    //           <Nav className="me-auto">
    //             <Nav.Link href="#features">Features</Nav.Link>
    //             <Nav.Link href="#pricing">Pricing</Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //     </Navbar>
    //   );
}

export default Header