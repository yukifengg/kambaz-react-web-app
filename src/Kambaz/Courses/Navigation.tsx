import { NavLink } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <NavLink to="/Kambaz/Courses/1234/Home"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        Home
      </NavLink>
      <NavLink to="/Kambaz/Courses/1234/Modules"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        Modules
      </NavLink>
      <NavLink to="/Kambaz/Courses/1234/Piazza"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        Piazza
      </NavLink>
      <NavLink to="/Kambaz/Courses/1234/Zoom"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        Zoom
      </NavLink>
      <NavLink to="/Kambaz/Courses/1234/Assignments"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        Assignments
      </NavLink>
      <NavLink to="/Kambaz/Courses/1234/Quizzes"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        Quizzes
      </NavLink>
      <NavLink to="/Kambaz/Courses/1234/People"
        className={({ isActive }) =>
          `list-group-item border-0 ${isActive ? "active text-danger" : "text-danger"}`
        }>
        People
      </NavLink>
    </div>
  );
}
