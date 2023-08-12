import { Link } from "react-router-dom";
import Search from "./Search";
import { useAuthContext } from "../context/Provider";
import Profile from "./Profile";
const Navbar = () => {
  const { auth, responseData } = useAuthContext();
  return (
    <nav className="container">
      <>
        {auth && (
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
