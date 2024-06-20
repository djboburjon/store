import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import { FaEdit, FaSearch } from "react-icons/fa";
import EditUser from "../editUser/EditUser";
import { TiPlus } from "react-icons/ti";

function User({ token }) {
  const [user, setUser] = useState();
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editName, setEditName] = useState("");
  const [editLastName, setEditLastName] = useState("");
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

    fetch(
      "https://telzone.pythonanywhere.com/user/all/?enum=admin",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, [token, changed]);

  const getItemData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://telzone.pythonanywhere.com/user/?pk=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEditUsername(result.username);
        setEditName(result.first_name);
        setEditLastName(result.last_name);
      })
      .catch((error) => console.error(error));
  };

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

          <Link to={"/user/all"}>
            <div className="users box_link">Foydalanuvchilar</div>
          </Link>
        </div>
        <div className="main_right">
          {editUser && (
            <EditUser
              token={token}
              editUser={editUser}
              setEditUser={setEditUser}
              changed={changed}
              setChanged={setChanged}
              editUsername={editUsername}
              setEditUsername={setEditUsername}
              editName={editName}
              setEditName={setEditName}
              editLastName={editLastName}
              setEditLastName={setEditLastName}
              editUserpassword={editUserpassword}
              setEditUserpassword={setEditUserpassword}
              itemId={itemId}
            />
          )}
          <div className="main_right-head">
            <h3>O'zgartirish uchun qalamchani tanlang</h3>
            <button
              className="client_add"
              onClick={() => {
                setAddUser(true);
              }}
            >
              USER QO'SH
              <TiPlus />
            </button>
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
                <th>Ism</th>
                <th>Familiya</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {user?.results?.slice(0, 25).map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.role}</td>
                    <td className="editClient_btn">
                      <FaEdit
                        onClick={() => {
                          setEditUser(true);
                          getItemData(item.id);
                          setItemId(item.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
