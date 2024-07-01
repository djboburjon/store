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
import Loader from "./components/loader/Loader";
import CurUser from "./components/curUser/CurUser";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";

function App() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [curUser, setCurUser] = useState(false);
  const [menu, setMenu] = useState(false);
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
          setLoading(false);
          setLogin(false);
        } else {
          setLogin(true);
          setLoading(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Nimadir xato saytni yangilang");
      });
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
          setLoading={setLoading}
        />
        {token != null && (
          <Navbar
            user={user}
            setLogin={setLogin}
            setToken={setToken}
            setCurUser={setCurUser}
          />
        )}
        {loading && <Loader />}
        {curUser && (
          <CurUser
            token={token}
            setLoading={setLoading}
            curUser={curUser}
            setCurUser={setCurUser}
          />
        )}

        <div className="container">
          <div
            className="menu"
            onClick={() => {
              setMenu(true);
            }}
          >
            <IoMenu />
          </div>
          <div className={menu ? "menuExit" : "exitNull"} onClick={() => {
            setMenu(false)
          }}>
            <FaTimes />
          </div>
          <div className={menu ? "main_left active1" : "main_left"}>
            <NavLink to={"/client/all"} onClick={() => {
              setMenu(false)
            }}>
              <div className="clients box_link">Mijozlar</div>
            </NavLink>
            <NavLink to={"/credit/all"} onClick={() => {
              setMenu(false)
            }}>
              <div className="credit box_link">Credit baza</div>
            </NavLink>

            <NavLink to={"/product/all"} onClick={() => {
              setMenu(false)
            }}>
              <div className="products box_link">Mahsulotlar</div>
            </NavLink>

            <NavLink to={"/sale/all"} onClick={() => {
              setMenu(false)
            }}>
              <div className="sales box_link">Sotuvlar</div>
            </NavLink>

            <NavLink to={"/expense/all"} onClick={() => {
              setMenu(false)
            }}>
              <div className="expenses box_link">Xarajatlar</div>
            </NavLink>

            <NavLink to={"/user/all"} onClick={() => {
              setMenu(false)
            }}>
              <div className="users box_link">Foydalanuvchilar</div>
            </NavLink>
          </div>
          <div className="main_right">
            <Routes>
              <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <Navigate to="/login" />}
              />
              <Route
                path="/"
                element={
                  token ? (
                    <Home
                      token={token}
                      setLoading={setLoading}
                      menu={menu}
                      setMenu={setMenu}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/client/:type"
                element={<Clients token={token} setLoading={setLoading} />}
              />
              <Route
                path="/product/:type"
                element={<Products token={token} setLoading={setLoading} />}
              />
              <Route
                path="/credit/:type"
                element={<Credit token={token} setLoading={setLoading} />}
              />
              <Route
                path="/sale/:type"
                element={<Sale token={token} setLoading={setLoading} />}
              />
              <Route
                path="/expense/:type"
                element={<Expenses token={token} setLoading={setLoading} />}
              />
              <Route
                path="/user/:type"
                element={<User token={token} setLoading={setLoading} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
