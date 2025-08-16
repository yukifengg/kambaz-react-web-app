import { Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControlButtons({
  onEdit,
  onDelete,
}: {
  quizId: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" size="sm">
        <IoEllipsisVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}