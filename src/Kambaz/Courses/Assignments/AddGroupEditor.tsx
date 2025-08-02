import { Modal, FormControl, Button } from "react-bootstrap";

export default function AddGroupEditor({
  show,
  handleClose,
  dialogTitle,
  groupName,
  setGroupName,
  addGroup,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  groupName: string;
  setGroupName: (name: string) => void;
  addGroup: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
            variant="primary"
            onClick={() => {
            addGroup();
            handleClose();
          }}>
          Add Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
