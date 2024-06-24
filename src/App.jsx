import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  NavLink,
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
import Expenses from "./components/expenses/Expenses";
import User from "./components/user/User";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
        <Login
          token={token}
          setToken={setToken}
          login={login}
          setLogin={setLogin}
        />
        {token != null && (
          <Navbar user={user} setLogin={setLogin} setToken={setToken} />
        )}

        <div className="container">
          <div className="main_left">
            <NavLink to={"/client/all"}>
              <div className="clients box_link">Mijozlar</div>
            </NavLink>
            <NavLink to={"/credit/all"}>
              <div className="credit box_link">Credit baza</div>
            </NavLink>

            <NavLink to={"/product/all"}>
              <div className="products box_link">Mahsulotlar</div>
            </NavLink>

            <NavLink to={"/sale/all"}>
              <div className="sales box_link">Chegirmalar</div>
            </NavLink>

            <NavLink to={"/expense/all"}>
              <div className="expenses box_link">Xarajatlar</div>
            </NavLink>

            <NavLink to={"/user/all"}>
              <div className="users box_link">Foydalanuvchilar</div>
            </NavLink>
          </div>
          <div className="main_right">
            <Routes>
              <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/"
                element={
                  token ? <Home token={token} /> : <Navigate to="/login" />
                }
              />
              <Route path="/client/:type" element={<Clients token={token} />} />
              <Route
                path="/product/:type"
                element={<Products token={token} />}
              />
              <Route path="/credit/:type" element={<Credit token={token} />} />
              <Route path="/sale/:type" element={<Sale token={token} />} />
              <Route
                path="/expense/:type"
                element={<Expenses token={token} />}
              />
              <Route path="/user/:type" element={<User token={token} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
