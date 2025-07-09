import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function AssignmentsControls() {
  return (
    <div id="wd-assignments-controls" className="clearfix mb-3">
      <InputGroup className="w-50 float-start" size="lg">
        <InputGroup.Text className="bg-white border-end-0">
          <CiSearch className="text-secondary fs-5" />
        </InputGroup.Text>
        <FormControl
          id="wd-search-assignment"
          placeholder="Search for Assignments"
          className="border-start-0"
        />
      </InputGroup>

      <div className="float-end">
        <Button
          variant="danger"
          size="lg"
          className="me-2"
          id="wd-add-assignment"
        >
          <FaPlus className="me-1" /> Assignment
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="me-2"
          id="wd-add-group"
        >
          <FaPlus className="me-1" /> Group
        </Button>
      </div>
    </div>
  );
}
