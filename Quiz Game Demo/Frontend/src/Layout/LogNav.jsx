import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import { logout } from "../utils/logout";
import "../styles/login.css";

export default function LogNav() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };
  return (
    <>
      <div className="LogNav">
        <p>
          <Link
            to="/quiz"
            style={{ color: "#2fc078", textDecoration: "none" }}
          >
            Play
          </Link>
        </p>
        <p>
          <Link
            to="/profile"
            style={{ color: "#2fc078", textDecoration: "none" }}
          >
            Profile
          </Link>
        </p>
        <p>
          <Link
            to="/leaderBoard"
            style={{ color: "#2fc078", textDecoration: "none" }}
          >
            LeaderBoard
          </Link>
        </p>
        <p onClick={handleLogout} style={{ color: "red" }}>
          Logout
        </p>
      </div>
    </>
  );
}
