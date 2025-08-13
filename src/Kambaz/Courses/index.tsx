import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
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

export default function Courses({
  enrolledCourses
}: {
  enrolledCourses: any[];
}) {
  const { cid } = useParams();
  const course = enrolledCourses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : "Course Not Found"} &gt;{" "}
        {pathname.split("/")[4] || ""}
      </h2>
      <hr />

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
        </div>
      </div>
    </div>
  );
}