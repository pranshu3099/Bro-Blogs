import { Link } from "react-router-dom";
import Search from "./Search";
import { useAuthContext } from "../context/Provider";
import Profile from "./Profile";
import { useState } from "react";
const Navbar = () => {
  const { auth, responseData } = useAuthContext();
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  let verified;
  if (bearer !== null) {
    verified = true;
  } else {
    verified = auth;
  }
  return (
    <nav className="container">
      <>
        {verified && (
          <div className="nav-main-container">
            <div className="nav-icons">
              <Link to="/" className="icons">
                Home
              </Link>
              <Link to="/create" className="icons">
                Write Blog
              </Link>
              <Profile />
            </div>
          </div>
        )}
      </>
    </nav>
  );
};

export default Navbar;
