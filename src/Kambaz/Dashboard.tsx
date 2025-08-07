import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
} from "./Courses/reducer";
import { enroll, unenroll } from "./Enrollments/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses, course } = useSelector((state: any) => state.coursesReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer);

  const isFaculty = currentUser?.role === "FACULTY";

  const [showAll, setShowAll] = useState(false);

  // Get the list of course IDs the current user is enrolled in
  const userEnrolledIds = enrollments[currentUser?._id] || [];

  // Filter courses accordingly
  const enrolledCourses = courses.filter((c: any) =>
    userEnrolledIds.includes(c._id)
  );
  const displayedCourses = showAll ? courses : enrolledCourses;

  // Toggle enroll/unenroll
  const toggleEnrollment = (courseId: string, isEnrolled: boolean) => {
    if (isEnrolled) {
      dispatch(unenroll({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enroll({ userId: currentUser._id, courseId }));
    }
  };

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        Dashboard
        <Button
          variant="primary"
          onClick={() => setShowAll(!showAll)}
          id="wd-enrollments-toggle"
        >
          {showAll ? "Show Enrolled Only" : "Show All Courses"}
        </Button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) =>
              dispatch(setCourse({ ...course, name: e.target.value }))
            }
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) =>
              dispatch(setCourse({ ...course, description: e.target.value }))
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAll
          ? `All Courses (${courses.length})`
          : `Enrolled Courses (${enrolledCourses.length})`}
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map((c: any) => {
          const isEnrolled = userEnrolledIds.includes(c._id);
          return (
            <Col key={c._id} style={{ width: "300px" }}>
              <Card>
                <Link
                  to={isEnrolled ? `/Kambaz/Courses/${c._id}/Home` : "#"}
                  className="text-decoration-none text-dark"
                  onClick={(e) => {
                    if (!isEnrolled) e.preventDefault();
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`/images/${c._id}.jpg`}
                    height={160}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/default.jpg";
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{c.name}</Card.Title>
                    <Card.Text>
                      {c.description || "No description available."}
                    </Card.Text>

                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(c._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(setCourse(c));
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </Card.Body>
                </Link>

                <div className="p-2 d-flex justify-content-center">
                <Button
                  variant={isEnrolled ? "danger" : "success"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleEnrollment(c._id, isEnrolled);
                  }}
                >
                  {isEnrolled ? "Unenroll" : "Enroll"}
                </Button>
              </div>

              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
