import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../styles/Navbar.css";

export default function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-licorice px-4 py-2" variant="dark">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="text-icterine fw-bold">🧙‍♂️ Dofus IDLE Tools</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <NavDropdown title="🛠️ Outils" className="text-icterine" menuVariant="dark">
              <NavDropdown.Item as={NavLink} to="/parchemins">📜 Parchemins</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/rentabilite-relique">📦 Rentabilité</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="⚙️ Optimisation" className="text-icterine" menuVariant="dark">
              <NavDropdown.Item as={NavLink} to="/ramdisk">🚀 RamDisk</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="🏰 Farm donjon" className="text-icterine" menuVariant="dark">
              <NavDropdown.Item as={NavLink} to="/royalmouth">🐑 Royalmouth</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/mansot">🐧 Mansot Royal</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/ben">🏴‍☠️ Ben le Ripate</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/obsidiantre">🌋 Obsidiantre</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/givrefoux">❄️ Givrefoux</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/korriandre">🕷️ Korriandre</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/kolosso">🐻‍❄️ Kolosso</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/profil" className="text-icterine">🧑‍🚀 Profil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
