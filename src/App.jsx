import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Clients from "./components/clients/Clients";
import Products from "./components/products/Products";
import Credit from "./components/credit/Credit";
import Sale from "./components/sale/Sale";

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
        <Login
          token={token}
          setToken={setToken}
          login={login}
          setLogin={setLogin}
        />
        {token != null && (
          <Navbar user={user} setLogin={setLogin} setToken={setToken} />
        )}

        <div>
          <div></div>
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/client/:type" element={<Clients token={token} />} />
            <Route path="/product/:type" element={<Products token={token} />} />
            <Route path="/credit/:type" element={<Credit token={token} />} />
            <Route path="/sale/:type" element={<Sale token={token} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
