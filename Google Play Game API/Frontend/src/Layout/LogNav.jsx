import React, { useState } from "react";
import Disk from "../Assets/Disk.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";
import { useAuth } from "../utils/authContext";

const LogNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isLoggedIn, user } = useAuth()

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(`Error in logging out`, error);
    }
  };

  const menuOptions = [
    { text: "Home" },
    { text: "About" },
    { text: "Testimonials" },
    { text: "Contact" },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img
          src={Disk}
          alt="Disk logo"
          style={{ height: "70px", width: "70px" }}
        />
        <h1 className="primary-heading">Disc</h1>
      </div>

      <div className="navbar-links-container">
        <Link to="/welcome">Home</Link>
        <Link to="/library">Library</Link>
        {isLoggedIn && user ? (
          <Link to="/profile">Welcome, {user.userName}</Link>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
        <Link className="primary-button" onClick={handleLogout}>
          Logout
        </Link>
      </div>

      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
    </nav>
  );
};

export default LogNav;
