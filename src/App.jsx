import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Clients from "./components/clients/Clients";

function App() {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/user/current/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.username) {
          setUser(result);
          setLogin(false);
        } else {
          setLogin(true);
          setUser(null);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, [token]);
  return (
    <>
      <BrowserRouter>
        <Login setToken={setToken} login={login} setLogin={setLogin} />
        <Navbar user={user} setLogin={setLogin} />

        <div>
          <div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client/:type" element={<Clients token={token} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
