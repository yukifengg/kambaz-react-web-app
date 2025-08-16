import { Form, Button, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

export default function QuizzesControls({
  quizName,
  setQuizName,
  quizPoints,
  setQuizPoints,
  addQuiz,
}: {
  quizName: string;
  setQuizName: (name: string) => void;
  quizPoints: number;
  setQuizPoints: (points: number) => void;
  addQuiz: () => void;
}) {
  return (
    <div className="wd-quizzes-controls mb-4 p-3 bg-light rounded">
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
        <Form.Control
          type="number"
          placeholder="Points"
          value={quizPoints}
          onChange={(e) => setQuizPoints(Number(e.target.value))}
          style={{ width: '100px' }}
        />
        <Button variant="primary" onClick={addQuiz}>
          <FaPlus className="me-1" /> Add Quiz
        </Button>
      </InputGroup>
    </div>
  );
}