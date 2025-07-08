import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { Navigate, Route, Routes } from "react-router";
import { useLocation } from "react-router-dom";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";

export default function Courses() {
    const location = useLocation();
    const isAssignmentEditor = location.pathname.includes("Assignments/") && location.pathname.split("/").length > 3;

    return (
      <div id="wd-courses">
        <h2>Course 1234</h2>
        <hr />
        <table>
            <tr>
            <td valign="top">
                <CourseNavigation />
            </td>
            <td valign="top">
                <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<h2>People</h2>} />
                </Routes>
                {isAssignmentEditor && (
                    <><hr />
                    <div id="wd-cancel-save" style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                        <button style={{ marginRight: "8px" }}>Cancel</button>
                        <button>Save</button>
                    </div></>
                )}
            </td>
            </tr>
        </table>
      </div>
  );}
  