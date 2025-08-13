import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  
  const links = currentUser
    ? [{ name: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { name: "Signin", path: "/Kambaz/Account/Signin" },
        { name: "Signup", path: "/Kambaz/Account/Signup" }
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            key={link.name}
            to={link.path}
            className={`list-group-item border-0 text-danger ${
              isActive ? "active" : ""
            }`}
          >
            {link.name}
          </Link>
        );
      })}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
    </div>
  );
}
