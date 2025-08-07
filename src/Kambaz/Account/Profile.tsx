import * as client from "./client";
import { setCurrentUser } from "./reducer";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen" style={{ width: "500px", margin: "auto" }}>
      <h3>Profile</h3>
      {profile && (
        <div>
          <Form.Control
            value={profile.username || ""}
            placeholder="Username"
            id="wd-username"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <Form.Control
            defaultValue={profile.password}
            placeholder="Password"
            type="password"
            id="wd-password"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <Form.Control
            defaultValue={profile.firstName}
            placeholder="First Name"
            id="wd-firstname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Form.Control
            defaultValue={profile.lastName}
            placeholder="Last Name"
            id="wd-lastname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <Form.Control
            defaultValue={profile.dob}
            type="date"
            id="wd-dob"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <Form.Control
            defaultValue={profile.email}
            type="email"
            placeholder="Email"
            id="wd-email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Form.Select
            defaultValue={profile.role}
            id="wd-role"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <button onClick={signout} className="wd-signout-btn btn btn-danger w-100"> Sign out </button>
        </div>
      )}
    </div>
  );
}
