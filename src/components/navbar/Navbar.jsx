import React from "react";
import "./Navbar.css";
import { FiUser } from "react-icons/fi";
import { CgDarkMode } from "react-icons/cg";
import { Link } from "react-router-dom";

function Navbar({ setUserInfo, user, setLogin }) {
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
              ""
            )}
            <li><CgDarkMode /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
