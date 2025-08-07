import { useState } from "react";
import { FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  // Assignment state
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  // Module state
  const [moduleObj, setModuleObj] = useState({
    id: "CS5610-2025",
    name: "Web Development",
    description: "Full-stack web development with React & NodeJS",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* --- ASSIGNMENT --- */}
      <h4>Assignment: Modifying Properties</h4>
      {/* Title */}
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary mb-3"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>

      {/* Score */}
      <FormControl
        type="number"
        className="w-75 mb-2"
        id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-success mb-3"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>

      {/* Completed */}
      <div className="mb-2">
        <input
          type="checkbox"
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label htmlFor="wd-assignment-completed" className="ms-2">
          Completed
        </label>
      </div>
      <a
        id="wd-update-assignment-completed"
        className="btn btn-warning mb-3"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      {/* Retrieve */}
      <div className="mb-4">
        <a
          id="wd-retrieve-assignment"
          className="btn btn-info me-2"
          href={`${ASSIGNMENT_API_URL}`}
        >
          Get Assignment
        </a>
        <a
          id="wd-retrieve-assignment-title"
          className="btn btn-info"
          href={`${ASSIGNMENT_API_URL}/title`}
        >
          Get Title
        </a>
      </div>

      <hr />

      {/* --- MODULE --- */}
      <h4>Module: Modifying Properties</h4>
      {/* Name */}
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        defaultValue={moduleObj.name}
        onChange={(e) => setModuleObj({ ...moduleObj, name: e.target.value })}
      />
      <a
        id="wd-update-module-name"
        className="btn btn-primary mb-3"
        href={`${MODULE_API_URL}/name/${moduleObj.name}`}
      >
        Update Module Name
      </a>

      {/* Description */}
      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        defaultValue={moduleObj.description}
        onChange={(e) =>
          setModuleObj({ ...moduleObj, description: e.target.value })
        }
      />
      <a
        id="wd-update-module-description"
        className="btn btn-primary mb-3"
        href={`${MODULE_API_URL}/description/${moduleObj.description}`}
      >
        Update Module Description
      </a>

      {/* Retrieve */}
      <div>
        <a
          id="wd-retrieve-module"
          className="btn btn-info me-2"
          href={`${MODULE_API_URL}`}
        >
          Get Module
        </a>
        <a
          id="wd-retrieve-module-name"
          className="btn btn-info"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
      </div>
    </div>
  );
}
