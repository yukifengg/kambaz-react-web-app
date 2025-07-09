import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaCalendar, FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup } from "react-bootstrap";

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>

      <NavLink
        to="/Kambaz/Account"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${isActive ? "bg-white text-danger" : "bg-black text-white"}`
        }
      >
        <FaRegCircleUser className="fs-1" />
        <br />
        Account
      </NavLink>

      <NavLink
        to="/Kambaz/Dashboard"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${isActive ? "bg-white text-danger" : "bg-black text-white"}`
        }
      >
        <AiOutlineDashboard className="fs-1" />
        <br />
        Dashboard
      </NavLink>

      <NavLink
        to="/Kambaz/Courses"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${isActive ? "bg-white text-danger" : "bg-black text-white"}`
        }
      >
        <LiaBookSolid className="fs-1" />
        <br />
        Courses
      </NavLink>

      <NavLink
        to="/Kambaz/Calendar"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${isActive ? "bg-white text-danger" : "bg-black text-white"}`
        }
      >
        <FaCalendar className="fs-1" />
        <br />
        Calendar
      </NavLink>

      <NavLink
        to="/Kambaz/Inbox"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${isActive ? "bg-white text-danger" : "bg-black text-white"}`
        }
      >
        <FaInbox className="fs-1" />
        <br />
        Inbox
      </NavLink>

      <NavLink
        to="/Labs"
        className={({ isActive }) =>
          `list-group-item text-center border-0 ${isActive ? "bg-white text-danger" : "bg-black text-white"}`
        }
      >
        <LiaCogSolid className="fs-1" />
        <br />
        Labs
      </NavLink>
    </ListGroup>
  );
}
