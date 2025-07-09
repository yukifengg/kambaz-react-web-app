import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { LuNotebookPen } from "react-icons/lu";

export default function Assignments() {
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
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3 text-success" />
                <div className="flex-grow-1">
                    <div id="wd-assignment-title">
                      <Link to="/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-decoration-none text-dark">
                        A1
                      </Link>
                    </div>
                    <div>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <span className="fw-semibold">Not available until</span> May 6 at 12:00am
                      <span className="mx-2">|</span>
                    </div>
                    <div className="text-secondary">
                      <span className="fw-semibold">Due</span> May 13 at 11:59pm
                      <span className="mx-2">|</span>
                      100 pts
                    </div>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3 text-success" />
                <div className="flex-grow-1">
                    <div id="wd-assignment-title">
                      <Link to="/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-decoration-none text-dark">
                        A2
                      </Link>
                    </div>
                    <div>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <span className="fw-semibold">Not available until</span> May 13 at 12:00am
                      <span className="mx-2">|</span>
                    </div>
                    <div className="text-secondary">
                      <span className="fw-semibold">Due</span> May 20 at 11:59pm
                      <span className="mx-2">|</span>
                      100 pts
                    </div>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3 text-success" />
                <div className="flex-grow-1">
                    <div id="wd-assignment-title">
                      <Link to="/Kambaz/Courses/1234/Assignments/123" className="fw-bold text-decoration-none text-dark">
                        A3
                      </Link>
                    </div>
                    <div>
                      <span className="text-danger">Multiple Modules</span>
                      <span className="mx-2">|</span>
                      <span className="fw-semibold">Not available until</span> May 20 at 12:00am
                      <span className="mx-2">|</span>
                    </div>
                    <div className="text-secondary">
                      <span className="fw-semibold">Due</span> May 27 at 11:59pm
                      <span className="mx-2">|</span>
                      100 pts
                    </div>
                </div>
                <LessonControlButtons />
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
    </div>
  );
}
