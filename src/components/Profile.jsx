import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import user from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/user.png";
import logout from "/home/pranshu/Bro Blogs/Bro-Blogs/src/icons/logout.png";
import { useAuthContext } from "../context/Provider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [show, setShow] = useState(false);
  const { isloggedout, setIsLoggedOut } = useAuthContext();
  const getBearerToken = () => localStorage.getItem("Bearer");
  const [bearer] = useState(getBearerToken);
  const navigate = useNavigate();
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    }),
    [bearer]
  );
  const handleProfileClick = () => {
    const dropdown = document.querySelector(".profile-icon");
    if (show) {
      dropdown.style.display = "none";
      setShow(false);
    } else {
      dropdown.style.display = "flex";
      dropdown.style.flexDirection = "coloumn";
      setShow(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Bearer");
    navigate("/Login");
  };
  return (
    <>
      <div onClick={handleProfileClick} className="nav-icons">
        <div style={{ cursor: "pointer" }}>Profile</div>
        <div className="profile-icon" id="profile-icon-container">
          <div className="profile-icon-sub-container">
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </div>
            <img src={logout} alt="" />
            <Link to="/myprofile">My profile</Link>
            <img src={user} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
