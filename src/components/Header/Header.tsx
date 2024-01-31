import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <Container className="header">
      <Navbar expand="lg" data-bs-theme="dark" className="p-0 ps-4 bg-transparent">
        <Nav>
          <Nav.Link as={NavLink} className="menu-item" to="/">
            Все котики
          </Nav.Link>
          <Nav.Link as={NavLink} className="menu-item" to="/favourites">
            Любимые котики
          </Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  );
}
