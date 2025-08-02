import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

  // If editing existing assignment, find it
  const assignment = aid !== "new" ? assignments.find((a: any) => a._id === aid) : null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [availableDate, setAvailableDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const toDateInput = (iso: string) => (iso ? iso.substring(0, 10) : "");

  useEffect(() => {
    if (assignment) {
      setName(assignment.name || "");
      setDescription(
        assignment.description ??
          "The assignment is available online. Submit a link to the landing page of Kambaz."
      );
      setPoints(assignment.points ?? 0);
      setAvailableDate(toDateInput(assignment.availableDate));
      setDueDate(toDateInput(assignment.dueDate));
    } else if (aid === "new") {
      // Clear form for new assignment
      setName("");
      setDescription("The assignment is available online. Submit a link to the landing page of Kambaz.");
      setPoints(0);
      setAvailableDate("");
      setDueDate("");
    }
  }, [assignment, aid]);

  if (aid !== "new" && !assignment) {
    return <div className="p-4">Assignment not found</div>;
  }

  const onSave = () => {
    const updatedAssignment = {
      ...(assignment || {}), // existing assignment properties if editing
      _id: assignment?._id || `new-${Date.now()}`, // generate temporary ID if new
      name,
      description,
      points,
      availableDate: availableDate ? new Date(availableDate).toISOString() : null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      courseId: cid,
    };

    dispatch(updateAssignment(updatedAssignment));
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-editor-screen" className="p-4">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <Form.Group controlId="wd-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={aid === "new" ? "Enter new assignment name" : undefined}
          />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-4">
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              id="wd-points"
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Display Grade as
          </Form.Label>
          <Col sm={10}>
            <Form.Select id="wd-display-grade-as" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Submission Type
          </Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              <Form.Select id="wd-submission-type" className="mb-3" defaultValue="ONLINE" disabled>
                <option value="ONLINE">Online</option>
              </Form.Select>

              <Form.Label className="mb-2">Online Entry Options</Form.Label>
              <div>
                <Form.Check id="wd-text-entry" label="Text Entry"  />
                <Form.Check id="wd-website-url" label="Website URL"  />
                <Form.Check id="wd-media-recordings" label="Media Recordings"  />
                <Form.Check id="wd-student-annotation" label="Student Annotation"  />
                <Form.Check id="wd-file-upload" label="File Uploads"  />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Assign
          </Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
                <Form.Select id="wd-assign-to" defaultValue="EVERYONE" disabled>
                  <option value="EVERYONE">Everyone</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                <Form.Control
                  type="date"
                  id="wd-due-date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                    <Form.Control
                      type="date"
                      id="wd-available-from"
                      value={availableDate}
                      onChange={(e) => setAvailableDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                    <Form.Control
                      type="date"
                      id="wd-available-until"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}