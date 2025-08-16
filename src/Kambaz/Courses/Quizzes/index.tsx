import { ListGroup, Button, Alert, Dropdown } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, togglePublish, deleteQuiz } from "./reducer";

function formatDateTime(dateString: string): string {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  const datePart = date.toLocaleDateString("en-US", options);
  const timePart = date.toLocaleTimeString("en-US", timeOptions).toLowerCase();
  return `${datePart} at ${timePart}`;
}

function getAvailabilityStatus(quiz: any) {
  const now = new Date();
  if (!quiz.availableDate) return "Not available yet";
  
  const availableFrom = new Date(quiz.availableDate);
  if (now < availableFrom) {
    return `Not available until ${formatDateTime(quiz.availableDate)}`;
  }
  
  if (quiz.availableUntil && now > new Date(quiz.availableUntil)) {
    return "Closed";
  }
  
  return "Available";
}

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quizName, setQuizName] = useState("New Quiz");
  const [quizPoints, setQuizPoints] = useState(100);

  const isFaculty = currentUser?.role === "FACULTY";

  if (!cid) {
    return <Alert variant="danger">Course ID is missing</Alert>;
  }

  const courseQuizzes = quizzes.filter((q: any) => q.course === cid);

  const handleAddQuiz = () => {
    if (!cid) return;
    const newQuiz = {
      _id: `quiz-${Date.now()}`,
      title: quizName,
      course: cid,
      points: quizPoints,
      isPublished: false,
      availableDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      questions: [],
    };
    dispatch(addQuiz(newQuiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
  };

  const handleTogglePublish = (quizId: string, currentStatus: boolean) => {
    dispatch(togglePublish({ quizId, currentStatus }));
  };

  const handleDeleteQuiz = (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(quizId));
    }
  };

  const getStudentScore = (quiz: any) => {
    if (currentUser?.role !== "STUDENT") return null;
    const attempt = quiz.attempts?.find((a: any) => a.user === currentUser._id);
    return attempt ? `Score: ${attempt.score}/${quiz.points}` : null;
  };

  return (
    <div id="wd-quizzes" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quizzes</h2>
        {isFaculty && (
          <Button variant="primary" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Add Quiz
          </Button>
        )}
      </div>

      {courseQuizzes.length === 0 ? (
        <Alert variant="info">
          No quizzes yet. {isFaculty && "Click 'Add Quiz' to create one."}
        </Alert>
      ) : (
        <ListGroup className="rounded-0">
          {courseQuizzes.map((quiz: any) => (
            <ListGroup.Item key={quiz._id} className="wd-quiz p-0 mb-5 fs-5 border-gray">
              {/* Quiz Header */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineArrowDropDown className="me-2 fs-3" />
                  <span 
                    onClick={() => handleTogglePublish(quiz._id, quiz.isPublished)}
                    style={{ cursor: 'pointer' }}
                  >
                    {quiz.isPublished ? '✅' : '🚫'}
                  </span>
                  <span 
                    className="ms-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)}
                  >
                    {quiz.title}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <Button variant="outline-dark" size="sm" className="me-2 rounded-pill">
                    {quiz.points} pts
                  </Button>
                  {isFaculty && (
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        <IoEllipsisVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item 
                          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item 
                          onClick={() => handleTogglePublish(quiz._id, quiz.isPublished)}
                        >
                          {quiz.isPublished ? 'Unpublish' : 'Publish'}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              </div>

              {/* Quiz Details */}
              <ListGroup className="wd-quiz-details rounded-0">
                <ListGroup.Item className="p-3 ps-1 d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div>
                      <span className="fw-semibold">Availability:</span>{" "}
                      {getAvailabilityStatus(quiz)}
                    </div>
                    <div className="text-secondary">
                      <span className="fw-semibold">Due:</span>{" "}
                      {formatDateTime(quiz.dueDate)}
                      {" | "}
                      <span className="fw-semibold">Questions:</span>{" "}
                      {quiz.questions?.length || 0}
                      {getStudentScore(quiz) && (
                        <span className="text-primary ms-2">
                          <strong>{getStudentScore(quiz)}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}