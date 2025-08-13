import { Link } from "react-router-dom";
import { Row, Col, Card, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Dashboard({
  courses,          
  course,          
  setCourse,        
  addNewCourse,
  updateCourse,
  deleteCourse,
  enrolling,
  setEnrolling,
  updateEnrollment
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: (newCourseData: any) => Promise<void>;
  updateCourse: (updatedCourse: any) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  enrolling: boolean;
  setEnrolling: (value: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const enrolledCourses = courses.filter((c) =>
    c.enrolled
  );
  const allCourses = courses;

  const [showAll] = useState(false);

  const displayedCourses = showAll ? allCourses : enrolledCourses;

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 className="d-flex justify-content-between">
        Dashboard
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => addNewCourse(course)}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => updateCourse(course)}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name || ""}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description || ""}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2>
        {showAll
          ? `All Courses (${allCourses.length})`
          : `Enrolled Courses (${enrolledCourses.length})`}
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map((courseItem: any) => {
          const isEnrolled = courseItem.enrolled === true;

          return (
            <Col key={courseItem._id} style={{ width: "300px" }}>
              <Card>
                <Link
                  to={
                    isEnrolled
                      ? `/Kambaz/Courses/${courseItem._id}/Home`
                      : "#"
                  }
                  className="text-decoration-none text-dark"
                  onClick={(e) => {
                    if (!isEnrolled) e.preventDefault();
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`/images/${courseItem._id}.jpg`}
                    height={160}
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/default.jpg";
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{courseItem.name}</Card.Title>
                    <Card.Text>
                      {courseItem.description || "No description available."}
                    </Card.Text>

                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(courseItem._id);
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
                            setCourse(courseItem);
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
                  {enrolling && (
                    <button
                      className={`btn ${
                        isEnrolled ? "btn-danger" : "btn-success"
                      }`}
                      onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }}
                    >
                      {isEnrolled ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}