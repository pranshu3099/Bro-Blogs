import { useState } from "react";
import { Link } from "react-router-dom";
import user from "/media/pranshu/My Passport/my-blog/src/icons/user.png";
import logout from "/media/pranshu/My Passport/my-blog/src/icons/logout.png";
import { useAuthContext } from "../context/Provider";
import axios from "axios";
const Profile = () => {
  const [show, setShow] = useState(false);
  const { isloggedout, setIsLoggedOut } = useAuthContext();
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
  const fetch = () => {
    const bearer_token = localStorage.getItem("bearer");
    const header = {
      Authorization: bearer_token,
    };
    axios
      .post("http://127.0.0.1:8000/api/auth/logout", {
        header: header,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    fetch();
  };
  return (
    <>
      <div onClick={handleProfileClick} className="nav-icons">
        <div style={{ cursor: "pointer" }}>Profile</div>
        <div className="profile-icon" id="profile-icon-container">
          <div className="profile-icon-sub-container">
            <div onClick={handleLogout}>Logout</div>
            <img src={user} alt="" />
          </div>
          <div className="profile-icon-sub-container">
            <Link to="/myprofile">My profile</Link>
            <img src={logout} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
