import React, { useEffect, useState } from "react";
import "./Login.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login({ login, setLogin, token, setToken, setLoading }) {
  const [userLogin, setUserLogin] = useState();
  const [userPassword, setUserPassword] = useState();
  const navigate = useNavigate();

  const getToken = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: userLogin,
      password: userPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/api/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access) {
          setToken(result.access);
          localStorage.setItem("token", result.access);
          navigate("/");
          setLogin(false);
          setUserLogin("");
          setUserPassword("");
          setLoading(false);
        } else {
          alert("There is no information");
          setLoading(false);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className={login ? "login active" : "login"}>
        <div className="container">
          <form
            className="form"
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              getToken();
            }}
          >
            <h3>Username</h3>
            <input
              value={userLogin}
              onChange={(e) => {
                setUserLogin(e.target.value);
              }}
              type="text"
              placeholder="Login"
            />
            <h3>Password</h3>
            <input
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
