import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import { FaEdit, FaSearch } from "react-icons/fa";
import EditUser from "../editUser/EditUser";

function User({ token }) {
  const [user, setUser] = useState();
  const [editUser, setEditUser] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editUserpassword, setEditUserpassword] = useState("");
  const [itemId, setItemId] = useState(0);
  const [changed, setChanged] = useState(false);

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
        setUser(result);
        setEditUsername(result.username);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, [token, changed]);

  return (
    <div className="userSection">
      <div className="container">
        <div className="main_left">
          <Link to={"/client/all"}>
            <div className="clients box_link">Mijozlar</div>
          </Link>

          <Link to={"/credit/all"}>
            <div className="credit box_link">Credit baza</div>
          </Link>

          <Link to={"/product/all"}>
            <div className="products box_link">Mahsulotlar</div>
          </Link>

          <Link to={"/sale/all"}>
            <div className="sales box_link">Chegirmalar</div>
          </Link>

          <Link to={"/expense/all"}>
            <div className="expeses box_link">Xarajatlar</div>
          </Link>

          <Link to={"/user/current"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          {editUser && (
            <EditUser
              token={token}
              editUser={editUser}
              setEditUser={setEditUser}
              editUsername={editUsername}
              setEditUsername={setEditUsername}
              changed={changed}
              setChanged={setChanged}
            />
          )}
          <div className="main_right-head">
            <h3>O'zgartirish uchun qalamchani tanlang</h3>
            {/* <button
              className="client_add"
              onClick={() => {
                setAddClient(true);
              }}
            >
              MIJOZ QO'SH
              <TiPlus />
            </button> */}
          </div>
          <div className="client_search">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <FaSearch />
              <input type="text" placeholder="Qidiruv..." />
            </form>
          </div>

          <table className="client_table">
            <thead>
              <tr>
                <th>№</th>
                <th>Username</th>
                <th>Faol/Nofaol</th>
              </tr>
            </thead>
            <tbody>
              {user && (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.is_active ? "Faol" : "Nofaol"}</td>
                  <td className="editClient_btn">
                    <FaEdit
                      onClick={() => {
                        setEditUser(true);
                      }}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
