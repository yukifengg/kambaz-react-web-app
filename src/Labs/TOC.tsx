import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab1" id="wd-a1"
          active={pathname.includes("Lab1")} >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab2" id="wd-a2"
          active={pathname.includes("Lab2")}>
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab3" id="wd-a3"
          active={pathname.includes("Lab3")}>
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab4" id="wd-a4"
          active={pathname.includes("Lab4")}>
          Lab 4
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab5" id="wd-a5"
          active={pathname.includes("Lab5")}>
          Lab 5
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz" id="wd-a3">
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link id="wd-github" href="https://github.com/yukifengg/kambaz-react-web-app" target="_blank">
          React GitHub
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link id="wd-github" href="https://github.com/yukifengg/kambaz-node-server-app" target="_blank">
          Node GitHub
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link id="wd-github" href="https://kambaz-node-server-app-q26x.onrender.com" target="_blank">
          Render
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
