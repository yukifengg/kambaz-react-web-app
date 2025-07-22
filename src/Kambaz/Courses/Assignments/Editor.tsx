import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div className="p-4">Assignment not found</div>;
  }

  const toDateInput = (iso: string) => iso?.substring(0, 10);

  return (
    <div id="wd-editor-screen" className="p-4">
      <Form>
        <Form.Group controlId="wd-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-4">
          <Form.Control
            as="textarea"
            rows={4}
            defaultValue={
              assignment.description ??
              "The assignment is available online. Submit a link to the landing page of Kambaz."
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label column sm={2}>Points</Form.Label>
          <Col sm={10}>
            <Form.Control id="wd-points" type="number" defaultValue={assignment.points} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Assignment Group</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Display Grade as</Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-display-grade-as" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Submission Type</Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              <Form.Select id="wd-submission-type" className="mb-3" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
              </Form.Select>

              <Form.Label className="mb-2">Online Entry Options</Form.Label>
              <div>
                <Form.Check id="wd-text-entry" label="Text Entry" />
                <Form.Check id="wd-website-url" label="Website URL" />
                <Form.Check id="wd-media-recordings" label="Media Recordings" />
                <Form.Check id="wd-student-annotation" label="Student Annotation" />
                <Form.Check id="wd-file-upload" label="File Uploads" />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>Assign</Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                <Form.Select id="wd-assign-to" defaultValue="EVERYONE">
                  <option value="EVERYONE">Everyone</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                <Form.Control
                  type="date"
                  id="wd-due-date"
                  defaultValue={toDateInput(assignment.dueDate)}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                    <Form.Control
                      type="date"
                      id="wd-available-from"
                      defaultValue={toDateInput(assignment.availableDate)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                    <Form.Control
                      type="date"
                      id="wd-available-until"
                      defaultValue={toDateInput(assignment.dueDate)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="primary">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}