import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import * as db from "../../Database";

function formatDateTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const date = new Date(dateString);
  const datePart = date.toLocaleDateString("en-US", options);
  const timePart = date.toLocaleTimeString("en-US", timeOptions).toLowerCase();
  return `${datePart} at ${timePart}`;
}

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(a => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentsControls />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <MdOutlineArrowDropDown className="me-2 fs-3" />
            ASSIGNMENTS
            <ModuleControlButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment) => (
              <ListGroup.Item
                key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
              >
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3 text-success" />
                <div className="flex-grow-1">
                  <div id="wd-assignment-title">
                    <Link
                      to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      className="fw-bold text-decoration-none text-dark"
                    >
                      {assignment.title}
                    </Link>
                  </div>
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <span className="fw-semibold">Not available until</span>{" "}
                    {formatDateTime(assignment.availableDate)}
                    <span className="mx-2">|</span>
                  </div>
                  <div className="text-secondary">
                    <span className="fw-semibold">Due</span> {formatDateTime(assignment.dueDate)}
                    <span className="mx-2">|</span>
                    {assignment.points} pts
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
