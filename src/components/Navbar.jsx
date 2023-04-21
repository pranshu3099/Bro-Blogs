import { Link } from "react-router-dom";
import Search from "./Search";
import { useAuthContext } from "../context/Provider";
import Profile from "./Profile";
const Navbar = () => {
  const { auth, responseData } = useAuthContext();
  return (
    <nav className="container">
      <div>
        <h1 className="logo">Bro Blogs</h1>
      </div>
      <>
        {auth && (
          <div className="nav-main-container">
            <div className="nav-icons">
              <Link to="/" className="icons">
                Home
              </Link>
              <Link to="/about" className="icons">
                About
              </Link>
              <Link to="/create" className="icons">
                Write Blog
              </Link>
              <Profile />
              <Search />
            </div>
          </div>
        )}
        <div className="nav-icons">
          {!auth && (
            <>
              {" "}
              <Link to="/login" className="icons">
                Login
              </Link>
              <Link to="/signup" className="icons">
                Signup
              </Link>
            </>
          )}
        </div>
      </>
    </nav>
  );
};

export default Navbar;
