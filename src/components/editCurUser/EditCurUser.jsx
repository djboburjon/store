import React from "react";
import "./EditCurUser.css";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function EditCurUser({
  baseUrl,
  token,
  setLoading,
  editCurUser,
  setEditCurUser,
  editCurUserFirstname,
  setEditCurUserFirstname,
  editCurUserLastname,
  setEditCurUserLastname,
  editCurUsername,
  setEditCurUsername,
  editCurUserPassword,
  setEditCurUserPassword,
  editCurUserRole,
  setEditCurUserRole,
  setCurUser,
  curData,
}) {
  const editData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = editCurUserPassword
      ? JSON.stringify({
          first_name: editCurUserFirstname,
          last_name: editCurUserLastname,
          username: editCurUsername,
          password: editCurUserPassword,
        })
      : JSON.stringify({
          first_name: editCurUserFirstname,
          last_name: editCurUserLastname,
          username: editCurUsername,
        });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${baseUrl}user/current/update/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response == "Success") {
          setCurUser(false);
          setLoading(false);
          notifySuccess()
        } else {
          setLoading(false);
          notify()
        }
      })
      .catch((error) => console.error(error));
  };
  const notify = () => {
    toast.warning("Ma'lumotlarni to'g'ri tahrirlang!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const notifySuccess = () => {
    toast.success("Ma'lumot tahrirlandi!", {
      position: "top-right",
      autoClose: 2000,
    });
  };
  return (
    <div className="editCurrentUser">
      <div
        className="exit_btn"
        onClick={() => {
          setCurUser(false);
          setEditCurUser(false);
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
            setLoading(true);
            editData();
          }}
        >
          <h3>Ism</h3>
          <input
            value={editCurUserFirstname}
            onChange={(e) => {
              setEditCurUserFirstname(e.target.value);
            }}
            type="text"
            placeholder="Ism kiriting"
          />
          <h3>Familiya</h3>
          <input
            value={editCurUserLastname}
            onChange={(e) => {
              setEditCurUserLastname(e.target.value);
            }}
            type="text"
            placeholder="Familiya kiriting"
          />
          <h3>Rol</h3>
          <input
            value={editCurUserRole}
            onChange={(e) => {
              setEditCurUserRole(e.target.value);
            }}
            type="text"
            placeholder="Rol kiriting"
          />
          <h3>Username</h3>
          <input
            value={editCurUsername}
            onChange={(e) => {
              setEditCurUsername(e.target.value);
            }}
            type="text"
            placeholder="Rol kiriting"
          />
          <h3>Password</h3>
          <input
            value={editCurUserPassword}
            onChange={(e) => {
              setEditCurUserPassword(e.target.value);
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

export default EditCurUser;
