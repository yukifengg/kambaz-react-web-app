import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* row 1 */}
        <Row xs={1} md={5} className="g-4">
        {/* col 1 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 1 */}
          <Card>
            <Link to="/Kambaz/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS1234.png" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {/* col 2 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 2 */}
          <Card>
            <Link to="/Kambaz/Courses/0002/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS0002.jpg" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0002 Course 2</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Software developer</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {/* col 3 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 3 */}
          <Card>
            <Link to="/Kambaz/Courses/0003/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS0003.jpg" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0003 Course 3</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                UI Engineer</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {/* col 4 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 4 */}
          <Card>
            <Link to="/Kambaz/Courses/0004/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS0004.jpg" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0004 Course 4</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Machine Learning</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        </Row>

        {/* row 2 */}
        <Row xs={1} md={5} className="g-4">
          {/* col 1 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 5 */}
          <Card>
            <Link to="/Kambaz/Courses/0005/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS0005.jpg" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0005 Course 5</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Aritifical Intelligence</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {/* col 2 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 6 */}
          <Card>
            <Link to="/Kambaz/Courses/0006/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS0006.jpg" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0006 Course 6</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Data Science</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {/* col 3 */}
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          {/* course 7 */}
          <Card>
            <Link to="/Kambaz/Courses/0007/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/CS0007.png" width="100%" height={160}/>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS0007 Course 7</Card.Title>
                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Database Management</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        </Row>
      </div>
    </div>
);}
