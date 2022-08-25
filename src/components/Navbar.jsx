import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import Viewport from "./Viewport";

var size = {
  height: 0,
  width: 0,
};
function NavigationBar() {
  return (
    <Navbar id="navbar" fix="top" expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Linez</Navbar.Brand>
        {Viewport().width < 992 ? <NavSmall /> : <NavBig />}
      </Container>
    </Navbar>
  );
}

function NavBig() {
  return (
    <div>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
    </div>
  );
}
function NavSmall() {
  return (
    <NavDropdown align="end" title="" id="basic-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Features</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Pricing</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
    </NavDropdown>
  );
}

export default NavigationBar;
export { size };
