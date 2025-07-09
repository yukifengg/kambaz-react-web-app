import { Navigate, Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";

import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Piazza from "./Piazza";
import Zoom from "./Zoom";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import Grades from "./Grades";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

export default function Courses() {
    const location = useLocation();
    const isAssignmentEditor = location.pathname.includes("Assignments/") && location.pathname.split("/").length > 3;

    return (
      <div id="wd-courses">
        <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            Course 1234 
        </h2> <hr />

        <div className="d-flex">
            <div className="d-none d-md-block">
                <CourseNavigation />
            </div>

            <div className="flex-fill">
                <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Piazza" element={<Piazza />} />
                <Route path="Zoom" element={<Zoom />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="Quizzes" element={<Quizzes />} />
                <Route path="Grades" element={<Grades />} />
                <Route path="People" element={<PeopleTable />} />
                </Routes>
                {isAssignmentEditor && (
                    <><hr />
                    <div id="wd-cancel-save" style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <button style={{ marginRight: "8px" }}>Cancel</button>
                        <button>Save</button>
                    </div></>
                )}
            </div>
        </div>
      </div>
  );}
  