import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ width: "500px", margin: "auto" }}>
      <h1>Profile</h1>

      <Form.Control
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
        id="wd-username"
      />

      <Form.Control
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
        id="wd-password"
      />

      <Form.Control
        defaultValue="Alice"
        placeholder="First Name"
        className="mb-2"
        id="wd-firstname"
      />

      <Form.Control
        defaultValue="Wonderland"
        placeholder="Last Name"
        className="mb-2"
        id="wd-lastname"
      />

      <Form.Control
        defaultValue="mm/dd/yyyy"
        type="date"
        className="mb-2"
        id="wd-dob"
      />

      <Form.Control
        defaultValue="alice@wonderland.com"
        type="email"
        placeholder="Email"
        className="mb-2"
        id="wd-email"
      />

      <Form.Select defaultValue="USER" className="mb-3" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Select>

      <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100">
        Sign out
      </Link>
    </div>
  );
}
