import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import AddAssignmentEditor from "./AddAssignmentEditor";
import AddGroupEditor from "./AddGroupEditor";
import { Link, useParams } from "react-router";

export default function AssignmentsControls({
  groupName,
  setGroupName,
  addGroup,
  assignmentName,
  setAssignmentName,
  addAssignment,
}: {
  groupName: string;
  setGroupName: (name: string) => void;
  addGroup: () => void;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  addAssignment: () => void;
}) {
  const [showAssignment, setShowAssignment] = useState(false);
  const [showGroup, setShowGroup] = useState(false);

  const { cid } = useParams();
  
  return (
    <div
      id="wd-assignments-controls"
      className="d-flex justify-content-between align-items-center mb-4"
    >
      {/* Search */}
      <InputGroup className="w-50" size="lg">
        <InputGroup.Text className="bg-white border-end-0">
          <CiSearch className="text-secondary fs-5" />
        </InputGroup.Text>
        <FormControl
          id="wd-search-assignment"
          placeholder="Search for Assignments"
          className="border-start-0"
        />
      </InputGroup>

      {/* Buttons */}
      <div className="d-flex gap-2">
        {/* Add Group */}
        <Button
          variant="secondary"
          size="lg"
          id="wd-add-group"
          onClick={() => setShowGroup(true)}
        >
          <FaPlus className="me-1" /> Group
        </Button>

        <Link
          to={`/Kambaz/Courses/${cid}/Assignments/new`}
          id="wd-add-assignment"
          style={{ textDecoration: "none" }}
        >
          <Button variant="danger" size="lg">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </Link>

        {/* Misc Menu */}
        <Button variant="secondary" size="lg" id="wd-assignment-misc">
          <IoEllipsisVertical />
        </Button>
      </div>

      {/* Assignment Modal */}
      <AddAssignmentEditor
        show={showAssignment}
        handleClose={() => setShowAssignment(false)}
        dialogTitle="Add Assignment"
        assignmentName={assignmentName}
        setAssignmentName={setAssignmentName}
        addAssignment={() => {
          addAssignment();
          setShowAssignment(false);
        }}
      />

      {/* Group Modal */}
      <AddGroupEditor
        show={showGroup}
        handleClose={() => setShowGroup(false)}
        dialogTitle="Add Group"
        groupName={groupName}
        setGroupName={setGroupName}
        addGroup={() => {
          addGroup();
          setShowGroup(false);
        }}
      />
    </div>
  );
}
