import React from "react";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setLogin, setToken, setCurUser }) {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="container">
        <h1>
          <Link to={"/"}>Store</Link>
        </h1>
        <div className="nav_left">
          <ul>
            <li>Welcome, {user ? user.username : "to site"}</li>
            {!user ? (
              <div
                className="login_icon"
                onClick={() => {
                  setLogin(true);
                }}
              >
                <p>{user ? user.username : "Login"}</p>
              </div>
            ) : (
              <div
                className="log_out"
                onClick={() => {
                  setToken(localStorage.removeItem("token"));
                  navigate("/login");
                }}
              >
                Log out
              </div>
            )}
            {user && (
              <div className="userLogo" onClick={() => {
                setCurUser(true)
              }}>
                <FaUserCircle />
              </div>
            )}
            <li>
              <CgDarkMode />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
