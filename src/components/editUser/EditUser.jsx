import React from "react";
import "./EditUser.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditUser({
  token,
  editUser,
  setEditUser,
  changed,
  setChanged,
  editUsername,
  setEditUsername,
  editName,
  setEditName,
  editLastName,
  setEditLastName,
  editUserpassword,
  setEditUserpassword,
  itemId,
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      first_name: editName,
      last_name: editLastName,
      username: editUsername,
      password: editUserpassword,
      role: "admin",
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://telzone.pythonanywhere.com/user/update/?pk=${itemId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEditUser(false);
        setChanged(!changed);
      })
      .catch((error) => console.error(error));
  };

  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  return (
    <div className="editUser">
      <ToastContainer />
      <div
        className="exit_btn"
        onClick={() => {
          setEditUser(false);
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
            if (editUsername.length != 0) {
              editData();
            } else {
              notify();
            }
          }}
        >
          <h3>Username</h3>
          <input
            value={editUsername}
            onChange={(e) => {
              setEditUsername(e.target.value);
            }}
            type="text"
            placeholder="Username kiriting"
          />
          <h3>Ism</h3>
          <input
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value);
            }}
            type="text"
            placeholder="Ism kiriting"
          />
          <h3>Familiya</h3>
          <input
            value={editLastName}
            onChange={(e) => {
              setEditLastName(e.target.value);
            }}
            type="text"
            placeholder="Familiya kiriting"
          />
          <h3>Parol</h3>
          <input
            value={editUserpassword}
            onChange={(e) => {
              setEditUserpassword(e.target.value);
            }}
            type="text"
            placeholder="Parol kiriting"
          />

          <button>Tahrirlash</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
