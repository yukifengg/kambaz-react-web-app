import { Modal, FormControl, Button } from "react-bootstrap";

export default function AddAssignmentEditor({
  show,
  handleClose,
  dialogTitle,
  assignmentName,
  setAssignmentName,
  addAssignment,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentName: string;
  setAssignmentName: (title: string) => void;
  addAssignment: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          placeholder="Assignment title"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>

        <Button
            variant="primary"
            onClick={() => {
            addAssignment();
            handleClose();
          }}>
          Add Assignment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
