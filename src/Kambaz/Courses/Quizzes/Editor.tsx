import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateQuiz } from "./reducer";

export default function QuizEditor() {
  const { cid, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === quizId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    attemptsAllowed: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    availableUntil: "",
    isPublished: false
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title,
        description: quiz.description || "",
        quizType: quiz.quizType || "Graded Quiz",
        points: quiz.points || 0,
        assignmentGroup: quiz.assignmentGroup || "Quizzes",
        shuffleAnswers: quiz.shuffleAnswers !== false,
        timeLimit: quiz.timeLimit || 20,
        multipleAttempts: quiz.multipleAttempts || false,
        attemptsAllowed: quiz.attemptsAllowed || 1,
        showCorrectAnswers: quiz.showCorrectAnswers || false,
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime !== false,
        webcamRequired: quiz.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
        dueDate: quiz.dueDate?.split('T')[0] || "",
        availableDate: quiz.availableDate?.split('T')[0] || "",
        availableUntil: quiz.availableUntil?.split('T')[0] || "",
        isPublished: quiz.isPublished || false
      });
    }
  }, [quiz]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    const updatedQuiz = {
      ...quiz,
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      availableDate: formData.availableDate ? new Date(formData.availableDate).toISOString() : null,
      availableUntil: formData.availableUntil ? new Date(formData.availableUntil).toISOString() : null
    };

    dispatch(updateQuiz(updatedQuiz));
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="p-4">
      <h2>{quizId === "new" ? "Create New Quiz" : "Edit Quiz"}</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Quiz Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Quiz Type
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="quizType"
              value={formData.quizType}
              onChange={handleChange}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              name="assignmentGroup"
              value={formData.assignmentGroup}
              onChange={handleChange}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Options
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="switch"
              label="Shuffle Answers"
              name="shuffleAnswers"
              checked={formData.shuffleAnswers}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              label="Time Limit"
              name="timeLimitEnabled"
              checked={formData.timeLimit > 0}
              onChange={(e) => setFormData({
                ...formData,
                timeLimit: e.target.checked ? 20 : 0
              })}
            />
            {formData.timeLimit > 0 && (
              <Form.Control
                type="number"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                className="mt-2"
              />
            )}
            <Form.Check
              type="switch"
              label="Multiple Attempts"
              name="multipleAttempts"
              checked={formData.multipleAttempts}
              onChange={handleChange}
            />
            {formData.multipleAttempts && (
              <Form.Control
                type="number"
                name="attemptsAllowed"
                value={formData.attemptsAllowed}
                onChange={handleChange}
                className="mt-2"
              />
            )}
            <Form.Check
              type="switch"
              label="Show Correct Answers"
              name="showCorrectAnswers"
              checked={formData.showCorrectAnswers}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              label="One Question at a Time"
              name="oneQuestionAtATime"
              checked={formData.oneQuestionAtATime}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              label="Webcam Required"
              name="webcamRequired"
              checked={formData.webcamRequired}
              onChange={handleChange}
            />
            <Form.Check
              type="switch"
              label="Lock Questions After Answering"
              name="lockQuestionsAfterAnswering"
              checked={formData.lockQuestionsAfterAnswering}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Access Code
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="accessCode"
              value={formData.accessCode}
              onChange={handleChange}
              placeholder="Leave blank for no access code"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Due Date
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Available From
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="availableDate"
              value={formData.availableDate}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Until
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="availableUntil"
              value={formData.availableUntil}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Label column sm={2}>
            Publish Status
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="switch"
              label="Published"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}