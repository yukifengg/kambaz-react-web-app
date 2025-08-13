import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCourse } from "./Courses/reducer";
import { enroll, unenroll } from "./Enrollments/reducer";

export default function Dashboard({
  enrolledCourses,
  allCourses,
  addNewCourse,
  updateCourse,
  deleteCourse,
  fetchEnrolledCourses,
  findAllCourses,
}: {
  enrolledCourses: any[];
  allCourses: any[];
  addNewCourse: (newCourseData: any) => Promise<void>;
  updateCourse: (updatedCourse: any) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  fetchEnrolledCourses: () => Promise<void>;
  findAllCourses: () => Promise<void>;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { course } = useSelector((state: any) => state.coursesReducer);

  const isFaculty = currentUser?.role === "FACULTY";
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => {
      const newShowAll = !prev;
      if (newShowAll) {
        findAllCourses();
      } else {
        fetchEnrolledCourses();
      }
      return newShowAll;
    });
  };

  const displayedCourses = showAll ? allCourses : enrolledCourses;

  const toggleEnrollment = async (courseId: string, isEnrolled: boolean) => {
    if (isEnrolled) {
      await dispatch(unenroll({ userId: currentUser._id, courseId }));
    } else {
      await dispatch(enroll({ userId: currentUser._id, courseId }));
    }
  
    // Always refresh both lists
    await fetchEnrolledCourses();
    await findAllCourses();
  };
  

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 className="d-flex justify-content-between">
        Dashboard
        <Button
          variant="primary"
          onClick={toggleShowAll}
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

      <h2>
        {showAll
          ? `All Courses (${allCourses.length})`
          : `Enrolled Courses (${enrolledCourses.length})`}
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map((courseItem: any) => {
          const isEnrolled = enrolledCourses.some(
            (ec) => ec._id === courseItem._id
          );

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
                      {courseItem.description ||
                        "No description available."}
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
                            dispatch(setCourse(courseItem));
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
                      toggleEnrollment(courseItem._id, isEnrolled);
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
