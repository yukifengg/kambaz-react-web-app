import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";

import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top">
              <Routes>
                {/* Redirect root based on login state */}
                <Route
                  path="/"
                  element={
                    <Navigate
                      to={
                        currentUser
                          ? "/Kambaz/Account/Profile"
                          : "/Kambaz/Account/Signin"
                      }
                    />
                  }
                />

                {/* Signin/Signup always accessible */}
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Signup" element={<Signup />} />

                {/* Profile only accessible if signed in */}
                <Route
                  path="/Profile"
                  element={
                    currentUser ? (
                      <Profile />
                    ) : (
                      <Navigate to="/Kambaz/Account/Signin" />
                    )
                  }
                />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
