import Modules from "../Modules";
import CourseStatus from "./Status";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      {/* Left side: Modules */}
      <div className="flex-fill me-3">
        {/* Top-right aligned Collapse All button (hidden on smaller screens) */}
        {/* <div className="d-none d-xl-flex justify-content-end mb-2">
          <Button variant="secondary" size="lg" >Collapse All</Button>
        </div> */}
        <Modules />
      </div>

      {/* Right side: Course Status (hidden on smaller screens) */}
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
