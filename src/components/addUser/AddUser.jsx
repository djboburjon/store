import React, { useState } from "react";
import "./AddUser.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function AddUser({ token, addUser, setAddUser, changed, setChanged }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const createUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      role: role,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/user/create/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAddUser(false);
        setChanged(!changed);
      })
      .catch((error) => console.error(error));
  };

  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri kiriting!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="addUser">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setAddUser(false);
        }}
      >
        <FaTimes />
      </div>
      <div className="container">
        <form
          className="form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (username.length != 0) {
              createUser();
            } else {
              notify();
            }
          }}
        >
          <h3>Ism</h3>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="Ism kiriting"
          />
          <h3>Familiya</h3>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="Familiya kiriting"
          />
          <h3>Rol</h3>
          <select onChange={(e)=> {
             setRole(e.target.value)
          }}>
            <option value="admin">Admin</option>
            <option value="worker">Ishchi</option>
          </select>
          <h3>Username</h3>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Username kiriting"
          />
          <h3>Parol</h3>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            placeholder="Parol kiriting"
          />
          <button>Qo'shish</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
