import { Card, Button, Badge, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

export default function QuizDetails() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const quiz = quizzes.find((q: any) => q._id === quizId);
  const isFaculty = currentUser?.role === "FACULTY";

  if (!quiz) {
    return <div className="alert alert-danger">Quiz not found</div>;
  }

  const getAvailabilityStatus = () => {
    const now = new Date();
    if (new Date(quiz.availableDate) > now) {
      return `Not available until ${formatDateTime(quiz.availableDate)}`;
    }
    if (quiz.availableUntil && new Date(quiz.availableUntil) < now) {
      return "Closed";
    }
    return "Available";
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        {isFaculty ? (
          <Button 
            variant="primary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/edit`)}
          >
            Edit
          </Button>
        ) : (
          <Button variant="success">Start Quiz</Button>
        )}
      </div>

      <Card>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Quiz Type:</strong> {quiz.quizType || 'Graded Quiz'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Points:</strong> {quiz.points}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Assignment Group:</strong> {quiz.assignmentGroup || 'Quizzes'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'Yes' : 'No'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Time Limit:</strong> {quiz.timeLimit || 20} Minutes
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? 'Yes' : 'No'}
            </ListGroup.Item>
            {quiz.multipleAttempts && (
              <ListGroup.Item>
                <strong>Attempts Allowed:</strong> {quiz.attemptsAllowed || 1}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers ? 'Yes' : 'No'}
            </ListGroup.Item>
            {quiz.accessCode && (
              <ListGroup.Item>
                <strong>Access Code:</strong> {quiz.accessCode}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title>Availability</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Due:</strong> {formatDateTime(quiz.dueDate)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Available From:</strong> {formatDateTime(quiz.availableDate)}
              </ListGroup.Item>
              {quiz.availableUntil && (
                <ListGroup.Item>
                  <strong>Until:</strong> {formatDateTime(quiz.availableUntil)}
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <strong>Status:</strong> <Badge bg={getAvailabilityStatus() === 'Available' ? 'success' : 'warning'}>
                  {getAvailabilityStatus()}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}