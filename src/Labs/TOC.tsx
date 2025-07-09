import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export default function TOC() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/Labs" end>
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/Labs/Lab1">
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/Labs/Lab2">
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/Labs/Lab3">
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/Kambaz">
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi" target="_blank">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
