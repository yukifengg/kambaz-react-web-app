import { FormControl, ListGroup, Button } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AssignmentsControls from "./AssignmentsControls";
import LessonControlButtons from "../Modules/LessonControlButtons";

import {
  addAssignment,
  addGroup,
  updateAssignment,
} from "./reducer";


function formatDateTime(dateString: string): string {
  if (!dateString) return "";
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  const datePart = date.toLocaleDateString("en-US", options);
  const timePart = date.toLocaleTimeString("en-US", timeOptions).toLowerCase();
  return `${datePart} at ${timePart}`;
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments, groups } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [assignmentName, setAssignmentName] = useState("");
  const [groupName, setGroupName] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";

  // Filter groups by course
  const courseGroups = groups.filter((g: any) => g.course === cid);

  // You can now use assignmentsClient here or in your dispatch thunks, e.g.:
  // assignmentsClient.createAssignmentForCourse(cid!, { ... })

  return (
    <div id="wd-assignments" className="p-3">
      {isFaculty && (
        <AssignmentsControls
          assignmentName={assignmentName}
          setAssignmentName={setAssignmentName}
          addAssignment={() => {
            if (!assignmentName.trim()) return;
            dispatch(
              addAssignment({
                name: assignmentName,
                course: cid,
                group: courseGroups[0]?.id || null, // assign to first group by default
                availableDate: new Date().toISOString(),
                dueDate: new Date().toISOString(),
                points: 100,
              })
            );
            setAssignmentName("");
          }}
          groupName={groupName}
          setGroupName={setGroupName}
          addGroup={() => {
            if (!groupName.trim()) return;
            dispatch(
              addGroup({
                _id: `grp${Date.now()}`, // generate unique group ID
                course: cid,
                name: groupName,
                weight: 0,
              })
            );
            setGroupName("");
          }}
        />
      )}

      <ListGroup className="rounded-0">
        {courseGroups.map((group: any) => {
          const groupAssignments = assignments.filter(
            (a: any) => a.course === cid && a.group === group.id
          );

          return (
            <ListGroup.Item key={group.id} className="wd-module p-0 mb-5 fs-5 border-gray">
              {/* Group Header */}
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineArrowDropDown className="me-2 fs-3" />
                  {group.name}
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="me-2 rounded-pill"
                  >
                    {group.weight}% of total
                  </Button>
                  <FaPlus className="me-2 fs-5" />
                  <IoEllipsisVertical className="fs-5" />
                </div>
              </div>

              {/* Assignments in this group */}
              <ListGroup className="wd-lessons rounded-0">
                {groupAssignments.map((assignment: any) => (
                  <ListGroup.Item
                    key={assignment._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <LuNotebookPen className="me-2 fs-3 text-success" />
                    <div className="flex-grow-1">
                      {!assignment.editing ? (
                        <>
                          <div id="wd-assignment-title">
                            <Link
                              to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                              className="fw-bold text-decoration-none text-dark"
                            >
                              {assignment.name}
                            </Link>
                          </div>
                          <div>
                            <span className="fw-semibold">Not available until</span>{" "}
                            {formatDateTime(assignment.availableDate)}
                          </div>
                          <div className="text-secondary">
                            <span className="fw-semibold">Due</span>{" "}
                            {formatDateTime(assignment.dueDate)}
                            {" | "}
                            {assignment.points} pts
                          </div>
                        </>
                      ) : (
                        <FormControl
                          className="w-50 d-inline-block"
                          value={assignment.name}
                          onChange={(e) =>
                            dispatch(
                              updateAssignment({
                                ...assignment,
                                name: e.target.value,
                              })
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(
                                updateAssignment({
                                  ...assignment,
                                  editing: false,
                                })
                              );
                            }
                          }}
                        />
                      )}
                    </div>
                    {isFaculty && <LessonControlButtons id={assignment._id} type={"assignment"} />}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
