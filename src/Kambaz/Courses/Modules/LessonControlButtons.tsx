import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { deleteAssignment } from "../Assignments/reducer";
import { deleteLesson } from "./reducer";
import React, { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";

interface LessonControlButtonsProps {
  id: string;
  moduleId?: string;
  type: "assignment" | "lesson";
}

const EllipsisToggle = React.forwardRef<HTMLSpanElement, any>(({ onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
  >
    <IoEllipsisVertical className="fs-4" />
  </span>
));
EllipsisToggle.displayName = "EllipsisToggle";

export default function LessonControlButtons({ id, moduleId, type }: LessonControlButtonsProps) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteConfirmed = () => {
    if (type === "assignment") {
      dispatch(deleteAssignment(id));
    } else if (type === "lesson") {
      if (!moduleId) {
        console.error("moduleId is required to delete a lesson");
        return;
      }
      dispatch(deleteLesson({ moduleId, lessonId: id }));
    }
    setShowConfirm(false);
  };

  return (
    <div className="float-end d-flex align-items-center gap-2">
      <GreenCheckmark />

      {/* Trash Can Icon */}
      <FaTrash
        className="text-danger"
        style={{ cursor: "pointer" }}
        title={`Delete ${type}`}
        onClick={() => setShowConfirm(true)}
      />

      {/* Ellipsis Menu */}
      <Dropdown align="end">
        <Dropdown.Toggle as={EllipsisToggle} />
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Duplicate</Dropdown.Item>
          {/* Could also keep delete option here if wanted */}
        </Dropdown.Menu>
      </Dropdown>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {type === "assignment" ? "Assignment" : "Lesson"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this {type}? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
