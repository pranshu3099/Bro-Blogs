import { Link } from "react-router-dom";
import Search from "./Search";
const Navbar = () => {
  return (
    <nav className="container">
      <div>
        <h1 className="logo">Bro Blogs</h1>
      </div>
      <Search />
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
        <Link to="/login" className="icons">
          Login
        </Link>
        <Link to="/signup" className="icons">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
