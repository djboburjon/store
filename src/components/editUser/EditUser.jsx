import React from "react";
import "./EditUser.css";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function EditUser({
  token,
  editUser,
  setEditUser,
  editUsername,
  setEditUsername,
  changed,
  setChanged,
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const raw = JSON.stringify({
      first_name: "string",
      last_name: "string",
      username: editUsername,
      password: "123",
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://telzone.pythonanywhere.com/user/update/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setEditUser(false)
        setChanged(!changed)
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
            if (editUser.length != 0) {
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

          <button>Tahrirlash</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
