import { useContext } from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext';
import './navbarAdmin.css';


export const NavbarAdmin = () => {

  const {logOut, user} = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logOut();
    navigate('/');
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to='/adminDashboard'>Travels</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/adminDashboard'>Dashboard</Nav.Link>
            <Nav.Link as={Link} to='/adminUserPage'>Admin users</Nav.Link>
          </Nav>
            <div className='d-flex gap-2 align-items-center'>
              <div onClick={()=> navigate('/adminProfile')}>
                {user?.avatar?
                <img className='nav-img' src={`${import.meta.env.VITE_SERVER_IMAGES_URL}/users/${user.avatar}`}/>:
                <div className='sin-avatar'>{user?.name.toUpperCase()[0]}</div>}
              </div>
              <Button onClick={onLogout}>Log out</Button>
            </div>
        </Container>
      </Navbar>
  )
}
